from django.shortcuts import render
from rest_framework import generics
from rest_framework_simplejwt import authentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from product.models import Product, Category
from product.api.serializers import ProductSerializer, ProductSimpleSerializer, CategorySerializer, ReviewRatingSerializer
from product.api.pagination import ProductsPagination
# Create your views here.

# Product list view
class AdminProductListView(generics.ListAPIView):
    pagination_class = ProductsPagination
    serializer_class = ProductSimpleSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [AllowAny,]
    queryset = Product.objects.all()
    
class AdminCategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    pagination_class = ProductsPagination
    authentication_classes = []
    permission_classes = [AllowAny,]
    queryset = Category.objects.filter(parent=None).all()