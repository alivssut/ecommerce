from rest_framework import serializers
from product.models import Product, Category
from rest_framework.response import Response

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
        
class ProductSimpleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = ("id", "name", "price", "image")
        
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySimpleSerializer(many=True)
    
    class Meta:
        model = Product
        fields = "__all__"