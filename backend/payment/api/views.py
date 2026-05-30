import requests
import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt import authentication
from django.conf import settings
from order.models import Order

logger = logging.getLogger(__name__)

ZARINPAL_MERCHANT = getattr(settings, 'ZARINPAL_MERCHANT', 'your-test-merchant-code')
ZARINPAL_SANDBOX_REQUEST = "https://sandbox.zarinpal.com/pg/rest/WebGate/PaymentRequest.json"
ZARINPAL_SANDBOX_VERIFY = "https://sandbox.zarinpal.com/pg/rest/WebGate/PaymentVerification.json"
ZARINPAL_STARTPAY = "https://sandbox.zarinpal.com/pg/StartPay/"


class ZarinPalRequestView(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        order_id = request.data.get('order_id')
        if not order_id:
            return Response({'error': 'شناسه سفارش الزامی است.'}, status=400)

        try:
            order = Order.objects.get(id=order_id, user=request.user, status=Order.PENDING)
        except Order.DoesNotExist:
            return Response({'error': 'سفارش معتبر نیست یا قبلاً پرداخت شده است.'}, status=400)

        amount_toman = sum(item.amount for item in order.order.all())
        amount_rial = amount_toman * 10

        callback_url = request.build_absolute_uri('/api/v1/payments/zarinpal/verify/')
        # For local testing with React on port 3000, you may want to redirect to frontend:
        # callback_url = "http://localhost:3000/payment/verify"

        data = {
            "MerchantID": ZARINPAL_MERCHANT,
            "Amount": amount_rial,
            "Description": f"سفارش شماره {order.code}",
            "CallbackURL": callback_url,
        }

        try:
            response = requests.post(ZARINPAL_SANDBOX_REQUEST, json=data, timeout=10)
            logger.info(f"ZarinPal request response: {response.status_code} - {response.text}")
        except requests.exceptions.RequestException as e:
            logger.error(f"ZarinPal connection error: {e}")
            return Response({'error': 'خطا در اتصال به درگاه پرداخت. لطفاً دوباره تلاش کنید.'}, status=503)

        try:
            result = response.json()
        except ValueError:
            logger.error(f"Invalid JSON from ZarinPal: {response.text}")
            return Response({'error': 'پاسخ نامعتبر از درگاه پرداخت.'}, status=502)

        if result.get("Status") == 100:
            authority = result["Authority"]
            order.zarinpal_authority = authority
            order.save(update_fields=['zarinpal_authority'])
            payment_url = f"{ZARINPAL_STARTPAY}{authority}"
            return Response({"payment_url": payment_url})
        else:
            logger.warning(f"ZarinPal payment request failed: {result}")
            return Response({'error': 'خطا در ایجاد درخواست پرداخت. کد خطا: ' + str(result.get('Status'))}, status=400)


class ZarinPalVerifyView(APIView):
    permission_classes = []

    def get(self, request):
        authority = request.GET.get('Authority')
        status_param = request.GET.get('Status')

        if status_param != 'OK':
            return Response({"status": "failed", "message": "پرداخت توسط کاربر لغو شد."})

        if not authority:
            return Response({"status": "failed", "message": "شناسه پرداخت نامعتبر است."})

        try:
            order = Order.objects.get(zarinpal_authority=authority)
        except Order.DoesNotExist:
            return Response({"status": "failed", "message": "سفارش یافت نشد."})

        amount_toman = sum(item.amount for item in order.order.all())
        amount_rial = amount_toman * 10

        data = {
            "MerchantID": ZARINPAL_MERCHANT,
            "Authority": authority,
            "Amount": amount_rial,
        }

        try:
            response = requests.post(ZARINPAL_SANDBOX_VERIFY, json=data, timeout=10)
            logger.info(f"ZarinPal verify response: {response.status_code} - {response.text}")
        except requests.exceptions.RequestException as e:
            logger.error(f"ZarinPal verify connection error: {e}")
            return Response({"status": "failed", "message": "خطا در تأیید پرداخت."}, status=503)

        try:
            result = response.json()
        except ValueError:
            logger.error(f"Invalid JSON from ZarinPal verify: {response.text}")
            return Response({"status": "failed", "message": "پاسخ نامعتبر از درگاه پرداخت."}, status=502)

        if result.get("Status") == 100:
            order.status = Order.PROCESSING
            order.zarinpal_authority = None  # Clear after successful payment
            order.save()
            return Response({"status": "success", "order_id": order.id})
        else:
            return Response({"status": "failed", "message": "پرداخت ناموفق بود."})