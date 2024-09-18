from django.shortcuts import render
from rest_framework import generics
from rest_framework_simplejwt import authentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from product.models import Product, Category, ReviewRating
from .serializers import ProductSerializer, ProductSimpleSerializer, CategorySerializer, ReviewRatingSerializer
from .pagination import ProductsPagination, ReviewsPagination
from django.utils.encoding import iri_to_uri
from urllib.parse import unquote
# Create your views here.

# Product list view
class ProductListView(generics.ListAPIView):
    pagination_class = ProductsPagination
    serializer_class = ProductSimpleSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [AllowAny,]
    queryset = Product.objects.all()

class ProductReviewsView(generics.ListAPIView):
    pagination_class = ReviewsPagination
    serializer_class = ReviewRatingSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [AllowAny,]
    
    def get_queryset(self):
        slug = unquote(self.kwargs.get('slug'))
        product = generics.get_object_or_404(Product, slug=slug)
        return ReviewRating.objects.filter(product=product, status="accepted")
    
class BestSellingProductListView(generics.ListAPIView):
    serializer_class = ProductSimpleSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        # Return only products with visibility='public' and status='Published'
        return Product.objects.filter(visibility='Public', status='Published')[:10]

# API to get 10 recommended products
class RecommendedProductsView(generics.ListAPIView):
    serializer_class = ProductSimpleSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        # Get the product_id from the URL
        product_id = self.kwargs['pk']

        # Retrieve the current product (optional, you can use this for future recommendation logic)
        current_product = Product.objects.get(id=product_id)

        # For now, return 10 random products (you can implement the recommendation logic later)
        return Product.objects.filter(visibility='Public', status='Published')[:10]

# Product create view
class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated,]
    
class ProductDetailByIdView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [AllowAny,]
    lookup_url_kwarg = 'id'
    lookup_field = 'id'

    def get_queryset(self):
        return Product.objects.filter(visibility='Public', status='Published')

    def get_object(self):
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset, id=self.kwargs[self.lookup_url_kwarg])
        return obj
    
class ProductDetailBySlugView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [AllowAny,]
    lookup_url_kwarg = 'slug'
    lookup_field = 'slug'

    def get_queryset(self):
        return Product.objects.filter(visibility='Public', status='Published')

    def get_object(self):
        queryset = self.get_queryset()
        slug = unquote(self.kwargs[self.lookup_url_kwarg])
        obj = generics.get_object_or_404(queryset, slug=slug)
        return obj
    
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
    
    
# Category list view
class CategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    authentication_classes = []
    permission_classes = [AllowAny,]
    queryset = Category.objects.filter(parent=None).all()