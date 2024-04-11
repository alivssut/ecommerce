from rest_framework import serializers
from product.models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "slug")
        
        
class ProductSimpleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = ("id", "name", "price", "image")
        
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True)
    
    class Meta:
        model = Product
        fields = "__all__"