from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt import authentication

from django.db.models import Q
from product.models import Product, Variant
from account.models import UserAddress
from order.models import Order, OrderItem
from .serializers import (
    CartItemSerializer,
    OrderSummarySerializer,
    OrderDetailSerializer,
)


class CartView(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        order = Order.objects.filter(
            user=request.user,
            status=Order.NOT_ORDERED
        ).first()

        if not order:
            return Response({
                'cart_items': [],
                'total_price': 0
            })

        cart_items = order.order.all()
        serializer = CartItemSerializer(cart_items, many=True)
        total_price = sum(item.amount for item in cart_items)

        return Response({
            'cart_items': serializer.data,
            'total_price': total_price
        })


class AddToCartView(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get('product_id')
        variant_id = request.data.get('variant_id')
        quantity = int(request.data.get('quantity', 1))

        if quantity < 1:
            return Response(
                {'error': 'تعداد باید بیشتر از صفر باشد.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        product = get_object_or_404(Product, id=product_id)
        variant = None
        if variant_id:
            variant = get_object_or_404(Variant, id=variant_id, product=product)

        available_stock = variant.quantity if variant else product.amount
        if available_stock < quantity:
            return Response(
                {'error': 'موجودی کافی نیست.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        order, _ = Order.objects.get_or_create(
            user=request.user,
            status=Order.NOT_ORDERED,
            defaults={'code': Order.generate_code()}  # implement this method
        )

        order_item, created = OrderItem.objects.get_or_create(
            order=order,
            user=request.user,
            product=product,
            variant=variant,
            defaults={'quantity': quantity, 'price': 0, 'amount': 0}
        )

        if not created:
            new_quantity = order_item.quantity + quantity
            if available_stock < new_quantity:
                return Response(
                    {'error': 'موجودی کافی نیست.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            order_item.quantity = new_quantity

        order_item.price = variant.price if variant else product.price
        order_item.amount = order_item.price * order_item.quantity
        order_item.save()

        cart_items = order.order.all()
        total_price = sum(item.amount for item in cart_items)

        return Response({
            'message': 'محصول به سبد خرید اضافه شد.',
            'cart_items': CartItemSerializer(cart_items, many=True).data,
            'total_price': total_price
        }, status=status.HTTP_200_OK)


class UpdateCartItemView(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        order_item = get_object_or_404(
            OrderItem,
            id=pk,
            user=request.user,
            order__status=Order.NOT_ORDERED
        )
        quantity = request.data.get('quantity')

        if quantity is None:
            return Response(
                {'error': 'مقدار تعداد الزامی است.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            quantity = int(quantity)
        except ValueError:
            return Response(
                {'error': 'تعداد باید عدد صحیح باشد.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if quantity < 1:
            return Response(
                {'error': 'تعداد باید بیشتر از صفر باشد.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        available_stock = (
            order_item.variant.quantity if order_item.variant
            else order_item.product.amount
        )
        if quantity > available_stock:
            return Response(
                {'error': f'حداکثر موجودی {available_stock} عدد می‌باشد.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        order_item.quantity = quantity
        order_item.amount = order_item.price * quantity
        order_item.save()

        order = order_item.order
        total_price = sum(item.amount for item in order.order.all())

        return Response({
            'cart_items': CartItemSerializer(order.order.all(), many=True).data,
            'total_price': total_price
        })


class RemoveFromCartView(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        order_item = get_object_or_404(
            OrderItem,
            id=pk,
            user=request.user,
            order__status=Order.NOT_ORDERED
        )
        order_item.delete()

        order = Order.objects.filter(
            user=request.user,
            status=Order.NOT_ORDERED
        ).first()
        if order and order.order.exists():
            total_price = sum(item.amount for item in order.order.all())
            cart_items = CartItemSerializer(order.order.all(), many=True).data
        else:
            total_price = 0
            cart_items = []

        return Response({
            'cart_items': cart_items,
            'total_price': total_price
        }, status=status.HTTP_200_OK)


class OrdersView(generics.ListAPIView):
    serializer_class = OrderSummarySerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(
            ~Q(status=Order.NOT_ORDERED),
            user=self.request.user
        )


class OrderDetailView(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        order = get_object_or_404(Order, id=order_id, user=request.user)
        serializer = OrderDetailSerializer(order)
        return Response(serializer.data)
    
class CreateOrderView(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        cart_order = Order.objects.filter(user=user, status=Order.NOT_ORDERED).first()

        if not cart_order or not cart_order.order.exists():
            return Response(
                {'error': 'سبد خرید شما خالی است.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        address_id = request.data.get('address_id')
        if not address_id:
            return Response(
                {'error': 'لطفاً یک آدرس انتخاب کنید.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        address = get_object_or_404(UserAddress, id=address_id, user=user)

        for item in cart_order.order.all():
            stock = item.variant.quantity if item.variant else item.product.amount
            if stock < item.quantity:
                return Response(
                    {'error': f'موجودی {item.product.name} کافی نیست.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        cart_order.address = address
        cart_order.address_post_code = address.post_code
        cart_order.status = Order.PENDING
        cart_order.full_name = address.full_name
        cart_order.phone = address.phone
        cart_order.ip = request.META.get('REMOTE_ADDR')
        cart_order.save()

        for item in cart_order.order.all():
            if item.variant:
                item.variant.quantity -= item.quantity
                item.variant.save()
            else:
                item.product.amount -= item.quantity
                item.product.save()

        serializer = OrderDetailSerializer(cart_order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)