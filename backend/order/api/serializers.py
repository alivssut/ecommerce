from rest_framework import serializers
from order.models import Order, OrderItem
from product.models import Variant, ProductAttribute


class VariantAttributeSerializer(serializers.ModelSerializer):
    attribute_name = serializers.CharField(source='attribute.name')
    value = serializers.CharField()

    class Meta:
        model = ProductAttribute
        fields = ('attribute_name', 'value')


class VariantSerializer(serializers.ModelSerializer):
    attributes = VariantAttributeSerializer(source='product_attribute', many=True, read_only=True)

    class Meta:
        model = Variant
        fields = ('id', 'sku', 'price', 'quantity', 'attributes')


class CartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(source='product.id')
    product_name = serializers.CharField(source='product.name')
    product_image = serializers.ImageField(source='product.image')
    product_slug = serializers.CharField(source='product.slug')
    variant = VariantSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = (
            'id', 'quantity', 'price', 'amount',
            'product_id', 'product_name', 'product_image', 'product_slug',
            'variant'
        )


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name')
    product_image = serializers.ImageField(source='product.image', read_only=True)
    variant_details = VariantSerializer(source='variant', read_only=True)

    class Meta:
        model = OrderItem
        fields = ('id', 'product_name', 'product_image', 'variant_details', 'quantity', 'price', 'amount', 'status')


class OrderSummarySerializer(serializers.ModelSerializer):
    total_items = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ('id', 'code', 'status', 'created', 'updated', 'total_items', 'total_price')

    def get_total_items(self, obj):
        return obj.order.count()
    
    def get_total_price(self, obj):
        return sum(item.amount for item in obj.order.all())


class OrderDetailSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(source='order', many=True, read_only=True)
    total_price = serializers.SerializerMethodField()
    full_address = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            'id', 'code', 'status', 'full_name', 'email', 'phone',
            'address_post_code', 'created', 'updated',
            'items', 'total_price', 'full_address'
        )

    def get_total_price(self, obj):
        return sum(item.amount for item in obj.order.all())

    def get_full_address(self, obj):
        if obj.address:
            addr = obj.address
            return f"{addr.province.name}، {addr.city.name}، {addr.address}"
        return "آدرس ثبت نشده"