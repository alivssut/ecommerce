from rest_framework import serializers
from order.models import Order, OrderItem
from unidecode import unidecode
from django.utils.text import slugify
from urllib.parse import unquote

class OrderSummarySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields = ("id", "address", "address_post_code", "code", "status", "phone")
        
def custom_slugify(value):
    return unquote(value)

class OrderItemSummarySerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(source="product.id")
    product_name = serializers.CharField(source="product.name")
    product_image = serializers.ImageField(source="product.image")
    product_slug = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ("id", "quantity", "price", "amount", "product_id", "product_name", "product_image", "product_slug")

    def get_product_slug(self, obj):
        return custom_slugify(obj.product.name)
        
# Serializer for listing minimal order information
class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'code', 'status', 'created', 'updated']

# Serializer for detailed order information including items and address
class OrderDetailSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'user', 'code', 'status', 'full_name', 'email', 'phone', 
                  'address', 'address_post_code', 'ip', 'created', 'updated', 'order_items']

    def get_order_items(self, obj):
        order_items = obj.order.all()  # Assuming related_name='order' in OrderItem
        return OrderItemSerializer(order_items, many=True).data

# Serializer for order items
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'variant', 'quantity', 'price', 'amount', 'status']