from django.shortcuts import render
from rest_framework import generics, filters
from rest_framework_simplejwt import authentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from product.models import Product, Category, ReviewRating, Brand
from .serializers import ProductSerializer, ProductSimpleSerializer, CategorySerializer, ReviewRatingSerializer, ProductDetailSerializer, BrandListSerializer
from .pagination import ProductsPagination, ReviewsPagination
from django.utils.encoding import iri_to_uri
from urllib.parse import unquote
from django.db.models import Q
# Create your views here.

class BrandListView(generics.ListAPIView):
    serializer_class = BrandListSerializer
    authentication_classes = []
    permission_classes = [AllowAny]
    queryset = Brand.objects.filter(is_active=True)

# Product list view
class ProductListView(generics.ListAPIView):
    pagination_class = ProductsPagination
    serializer_class = ProductSimpleSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [AllowAny,]
    queryset = Product.objects.all()
    
    def get_queryset(self):
        queryset = Product.objects.filter(visibility='Public', status='Published')
        brand_slug = self.request.query_params.get('brand')
        if brand_slug:
            queryset = queryset.filter(brand__slug=brand_slug)
        return queryset.order_by('-created')

class ProductReviewsView(generics.ListAPIView):
    pagination_class = ReviewsPagination
    serializer_class = ReviewRatingSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [AllowAny,]
    
    def get_queryset(self):
        slug = unquote(self.kwargs.get('slug'))
        product = generics.get_object_or_404(Product, slug=slug)
        return ReviewRating.objects.filter(product=product, status="accepted")

class ProductReviewCreateView(generics.CreateAPIView):
    serializer_class = ReviewRatingSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
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
    serializer_class = ProductDetailSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [AllowAny,]
    lookup_url_kwarg = 'id'
    lookup_field = 'id'

    def get_queryset(self):
        return Product.objects.filter(visibility='Public', status='Published').select_related('brand').prefetch_related(
            'category', 'images', 'product_attribute__attribute', 'variation__product_attribute__attribute', 'reviews'
        )

    def get_object(self):
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset, id=self.kwargs[self.lookup_url_kwarg])
        return obj
    
class ProductDetailBySlugView(generics.RetrieveAPIView):
    serializer_class = ProductDetailSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [AllowAny,]
    lookup_url_kwarg = 'slug'
    lookup_field = 'slug'

    def get_queryset(self):
        return Product.objects.filter(
            visibility='Public',
            status='Published'
        ).select_related('brand').prefetch_related(
            'category',
            'images',
            'product_attribute__attribute',
            'variation__product_attribute__attribute',
            'reviews'
        )

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
    pagination_class = ProductsPagination
    serializer_class = ProductSimpleSerializer
    model = Product
    lookup_url_kwarg = 'slug'

    def get_queryset(self):
        slug = unquote(self.kwargs[self.lookup_url_kwarg])
        return Product.objects.filter(Q(category__slug=slug) | Q(category__parent__slug=slug))
    
    
# Category list view
class CategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    authentication_classes = []
    permission_classes = [AllowAny,]
    queryset = Category.objects.filter(parent=None, is_active=True).all()
    
    
class ProductSearchView(generics.ListAPIView):
    pagination_class = ProductsPagination
    serializer_class = ProductSimpleSerializer
    authentication_classes = []
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

    def get_queryset(self):
        return Product.objects.filter(
            visibility='Public',
            status='Published'
        ).order_by('-created')