from django.urls import path
from product.api import views


urlpatterns = [
    path('v1/products/', views.ProductListView.as_view(), name="product-list"),
    path('v1/products/<int:id>/', views.ProductDetailByIdView.as_view(), name="product-detail"),
    path('v1/products/create/', views.ProductCreateView.as_view(), name="product-create"),
    path('v1/products/<int:id>/update/', views.ProductUpdateView.as_view(), name="product-update"),
    path('v1/products/<int:id>/delete/', views.ProductDeleteView.as_view(), name="product-delete"),
    
    path('v1/category-list/', views.CategoryListView.as_view(), name="category-list"),
    path('v1/product-category/<int:id>/', views.ProductFromCategoryListView.as_view(), name="product-category"),
]