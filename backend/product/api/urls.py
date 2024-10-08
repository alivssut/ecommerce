from django.urls import path, re_path
from product.api import views

urlpatterns = [
    path('v1/products/', views.ProductListView.as_view(), name="product-list"),
    path('v1/products/best-sellers/', views.BestSellingProductListView.as_view(), name="product-best-sellers"),
    path('v1/products/<int:id>/', views.ProductDetailByIdView.as_view(), name="product-detail-by-id"),
    re_path('v1/products/(?P<slug>[^/]+)/?$', views.ProductDetailBySlugView.as_view(), name='product-detail-by-slug'),
    re_path('v1/products/(?P<slug>[^/]+)/?/reviews/$', views.ProductReviewsView.as_view(), name='product-reviews'),
    path('v1/products/create/', views.ProductCreateView.as_view(), name="product-create"),
    path('v1/products/<int:id>/update/', views.ProductUpdateView.as_view(), name="product-update"),
    path('v1/products/<int:id>/delete/', views.ProductDeleteView.as_view(), name="product-delete"),
    path('v1/products/<int:pk>/recommended/', views.RecommendedProductsView.as_view(), name='recommended-products'),
    
    path('v1/category-list/', views.CategoryListView.as_view(), name="category-list"),
    re_path('v1/product-category/(?P<slug>[^/]+)/?$', views.ProductFromCategoryListView.as_view(), name="product-category"),
]