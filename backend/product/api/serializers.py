from rest_framework import serializers
from product.models import Product, Category, ProductImage, ReviewRating, Brand, Attribute, ProductAttribute, Variant
from rest_framework.response import Response
from account.api.serializers import SimpleUserSerializer
from django.db.models import Avg, Count

class CategorySimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "slug")
        
class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    def get_children(self, obj):
        children = Category.objects.filter(parent=obj)
        serializer = CategorySerializer(children, many=True)
        return serializer.data
    
    class Meta:
        model = Category
        fields = ("id", "name", "slug", "image", "children")

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ('id', 'name', 'slug', 'description')

class BrandListSerializer(serializers.ModelSerializer):
    product_count = serializers.IntegerField(source='products.count', read_only=True)

    class Meta:
        model = Brand
        fields = ('id', 'name', 'slug', 'product_count')

class AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attribute
        fields = ('id', 'name', 'slug')

class ProductAttributeSerializer(serializers.ModelSerializer):
    attribute = AttributeSerializer(read_only=True)

    class Meta:
        model = ProductAttribute
        fields = ('id', 'attribute', 'name', 'value')
        
class VariantSerializer(serializers.ModelSerializer):
    attributes = ProductAttributeSerializer(source='product_attribute', many=True, read_only=True)

    class Meta:
        model = Variant
        fields = ('id', 'sku', 'quantity', 'price', 'attributes')

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text']

class ReviewRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewRating
        fields = ['id', 'product', 'user', 'subject', 'review', 'rating', 'status', 'created_at', 'updated_at']
        read_only_fields = ['user', 'status', 'created_at', 'updated_at']
        
class ProductSimpleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = ("id", "name", "price", "image", "slug")

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySimpleSerializer(many=True)
    images = ProductImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = "__all__"
        
class ProductDetailSerializer(serializers.ModelSerializer):
    categories = CategorySimpleSerializer(source='category', many=True, read_only=True)
    brand = BrandSerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    attributes = ProductAttributeSerializer(source='product_attribute', many=True, read_only=True)
    variants = VariantSerializer(source='variation', many=True, read_only=True)
    review_summary = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            'id', 'name', 'sku', 'image', 'price', 'description',
            'brand', 'amount', 'slug', 'status', 'product_type',
            'visibility', 'created', 'updated',
            'categories', 'images', 'attributes', 'variants',
            'review_summary'
        )

    def get_review_summary(self, obj):
        reviews = obj.reviews.filter(status='accepted')
        agg = reviews.aggregate(
            average_rating=Avg('rating'),
            total_reviews=Count('id')
        )
        distribution = reviews.values('rating').annotate(count=Count('id'))
        dist_dict = {item['rating']: item['count'] for item in distribution}
        return {
            'average_rating': round(agg['average_rating'] or 0, 1),
            'total_reviews': agg['total_reviews'] or 0,
            'rating_distribution': dist_dict
        }