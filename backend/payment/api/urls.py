from django.urls import path
from .views import ZarinPalRequestView, ZarinPalVerifyView

urlpatterns = [
    path('zarinpal/request/', ZarinPalRequestView.as_view(), name='zarinpal-request'),
    path('zarinpal/verify/', ZarinPalVerifyView.as_view(), name='zarinpal-verify'),
]