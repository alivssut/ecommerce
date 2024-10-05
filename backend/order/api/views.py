from django.shortcuts import render
from rest_framework import generics
from rest_framework_simplejwt import authentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from order.models import Order, OrderItem
from .serializers import OrderSummarySerializer, OrderItemSummarySerializer, OrderDetailSerializer
from django.db.models import Q
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from product.models import Product, Variant
from rest_framework.views import APIView
# Create your views here.

class CartView(generics.ListAPIView):
    serializer_class = OrderItemSummarySerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated,]
    
    def get_queryset(self):
        order = Order.objects.filter(user=self.request.user, status=Order.NOT_ORDERED)
        if order.exists():
            return order.first().order
        return []
    
class OrdersView(generics.ListAPIView):
    serializer_class = OrderSummarySerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated,]
    
    def get_queryset(self):
        queryset = Order.objects.filter(~Q(status=Order.NOT_ORDERED), user=self.request.user)
        return queryset
    
class AddToCartView(APIView):
    serializer_class = OrderSummarySerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated,]

    def post(self, request, *args, **kwargs):
        # Retrieve data from the request
        product_id = request.data.get('product_id')
        variant_id = request.data.get('variant_id', None)
        quantity = request.data.get('quantity', 1)

        if int(quantity) < 1:
            return Response({
                'error': 'تعداد باید از صفر بیشتر باشد'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if the product exists
        product = get_object_or_404(Product, id=product_id)

        # Check if a variant is selected
        variant = None
        if variant_id:
            variant = get_object_or_404(Variant, id=variant_id)

        # Check available stock for the product or variant
        available_quantity = variant.quantity if variant else product.amount  # Assuming 'quantity' field represents stock
        if available_quantity < int(quantity):
            return Response({
                'error': 'این تعداد در انبار موجود نمی باشد.'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Get or create an order (Order) that is in progress
        order, created = Order.objects.get_or_create(
            user=request.user,
            status=Order.NOT_ORDERED,  # Order status should be 'Pending'
        )
        print(quantity)
        # Check if the product is already in the cart
        order_item, item_created = OrderItem.objects.get_or_create(
            order=order,
            user=request.user,
            product=product,
            variant=variant,
            defaults={'quantity': int(quantity), 'price': 0, 'amount': 0}
        )
        
        # Update quantity and price
        new_quantity = order_item.quantity + int(quantity) if not item_created else int(quantity)
        
        # Check stock again for the updated total quantity
        if available_quantity < new_quantity:
            return Response({
                'error': 'این تعداد در انبار موجود نمی باشد.'
            }, status=status.HTTP_400_BAD_REQUEST)

        order_item.quantity = new_quantity
        order_item.price = variant.price if variant else product.price
        order_item.amount = order_item.price * order_item.quantity
        order_item.save()

        # Update the total price for the order
        order_total_price = sum(item.amount for item in order.order.all())
        
        # Build the final response
        serializer = self.serializer_class(order)
        return Response({
            'order': serializer.data,
            'order_total_price': order_total_price
        }, status=status.HTTP_200_OK)
        
class RemoveFromCartView(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, item_id, *args, **kwargs):
        # Retrieve the order item
        order_item = get_object_or_404(OrderItem, id=item_id, user=request.user)
        
        # Delete the order item
        order_item.delete()

        return Response({'message': 'Item removed from cart successfully.'}, status=status.HTTP_204_NO_CONTENT)

class ListOrdersView(APIView):
    serializer_class = OrderSummarySerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Retrieve all orders for the user
        orders = Order.objects.filter(user=request.user)

        # Serialize the orders
        serializer = self.serializer_class(orders, many=True)

        return Response({'orders': serializer.data}, status=status.HTTP_200_OK)

class OrderDetailView(APIView):
    serializer_class = OrderDetailSerializer  # Use the appropriate serializer for detailed view
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id, *args, **kwargs):
        # Retrieve the order by ID
        order = get_object_or_404(Order, id=order_id, user=request.user)

        # Serialize the order details
        serializer = self.serializer_class(order)

        return Response({'order': serializer.data}, status=status.HTTP_200_OK)
