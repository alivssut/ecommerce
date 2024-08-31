from rest_framework import serializers
from order.models import Order, OrderItem

class OrderSummarySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields = ("id", "address", "address_post_code", "code", "status", "phone")
        
class OrderItemSummarySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OrderItem
        fields = ("id", "quantity", "price", "amount", "product")