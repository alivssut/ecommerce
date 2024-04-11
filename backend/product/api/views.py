from django.shortcuts import render
from rest_framework import generics
from rest_framework_simplejwt import authentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from product.models import Product
from .serializers import ProductSerializer, ProductSimpleSerializer
# Create your views here.

# Product list view
class ProductListView(generics.ListAPIView):
    serializer_class = ProductSimpleSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [AllowAny,]
    queryset = Product.objects.all()
    
# Product create view
class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated,]
    
# Product detail by id view
class ProductDetailByIdView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [AllowAny,]
    lookup_url_kwarg  = 'id'
    lookup_field = 'id'
    queryset = Product.objects.all()
    
# Product update view
class ProductUpdateView(generics.UpdateAPIView):
    authentication_classes = [authentication.JWTAuthentication]
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser,]
    queryset = Product.objects.all()
    
# Product delete view
class ProductDeleteView(generics.DestroyAPIView):
    serializer_class = ProductSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAdminUser,]
    
# Product from category 
class ProductFromCategoryListView(generics.ListAPIView):
    authentication_classes = []
    serializer_class = ProductSimpleSerializer
    model = Product
    lookup_url_kwarg = 'id'

    def get_queryset(self):
        category_id = self.kwargs.get(self.lookup_url_kwarg)
        return Product.objects.filter(category__id=category_id)