from django.urls import path
from order.api import views


urlpatterns = [
    path(route='v1/cart/', view=views.CartView.as_view(), name='summary'),
    path(route='v1/orders/', view=views.OrdersView.as_view(), name='orders'),
    path('v1/orders/<int:order_id>/', views.OrderDetailView.as_view(), name='order-detail'),
    path(route='v1/cart/add/', view=views.AddToCartView.as_view(), name='add-to-cart'),
    path('v1/cart/update/<int:pk>/', views.UpdateCartItemView.as_view(), name='update-cart-item'),
    path('v1/cart/remove/<int:pk>/', views.RemoveFromCartView.as_view(), name='remove-from-cart'),
    path('v1/orders/create/', views.CreateOrderView.as_view(), name='create-order'),
]