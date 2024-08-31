from django.urls import path
from order.api import views


urlpatterns = [
    path(route='v1/cart/', view=views.CartView.as_view(), name='summary'),
    path(route='v1/orders/', view=views.OrdersView.as_view(), name='orders'),
    # path(route='cart/add-to-cart/', view=views.AddToCartView.as_view(), name='add-to-cart'),
    # path(route='cart/checkout/', view=views.CheckoutView.as_view(), name='checkout'),
    # path(route='cart/orders/<pk>/', view=views.OrderDetailView.as_view(), name='order-detail'),
    # path(route='cart/confirm-order/', view=views.ConfirmOrderView.as_view(), name='confirm-order'),
    # path(
    #     route='cart/increase-quantity/<pk>/',
    #     view=views.IncreaseQuantityView.as_view(),
    #     name='increase-quantity',
    # ),
    # path(
    #     route='cart/decrease-quantity/<pk>/',
    #     view=views.DecreaseQuantityView.as_view(),
    #     name='decrease-quantity',
    # ),
    # path(
    #     route='cart/remove-from-cart/<pk>/',
    #     view=views.RemoveFromCartView.as_view(),
    #     name='remove-from-cart',
    # ),
]