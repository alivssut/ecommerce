from django.urls import path
from account.api import views
from .views import (
    UserProfileView,
    AddressListView,
    AddressDetailView,
    SetDefaultAddressView,
)

urlpatterns = [
    path('v1/users/', views.UserListView.as_view(), name="users"),
    path('v1/profile/', UserProfileView.as_view(), name='user-profile'),
    path('v1/addresses/', AddressListView.as_view(), name='address-list'),
    path('v1/addresses/<int:pk>/', AddressDetailView.as_view(), name='address-detail'),
    path('v1/addresses/<int:pk>/set-default/', SetDefaultAddressView.as_view(), name='set-default-address'),
]