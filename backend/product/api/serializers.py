from rest_framework import serializers
from product.models import Product, Category, ProductImage, ReviewRating
from rest_framework.response import Response
from account.api.serializers import SimpleUserSerializer

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

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text']

class ReviewRatingSerializer(serializers.ModelSerializer):
    user = SimpleUserSerializer() 
    class Meta:
        model = ReviewRating
        fields = "__all__"
        
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