from django.shortcuts import render
from rest_framework import generics
from rest_framework_simplejwt import authentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from order.models import Order
from .serializers import OrderSummarySerializer, OrderItemSummarySerializer
from django.db.models import Q
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
    
    # def post(self, request, *args, **kwargs):
        
    #     return queryset