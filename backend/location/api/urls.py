from django.urls import path
from account.api.views import CountryListView, RegionListView, CityListView

urlpatterns = [
    path('v1/location/countries/', CountryListView.as_view(), name='countries'),
    path('v1/location/regions/', RegionListView.as_view(), name='regions'),
    path('v1/location/cities/', CityListView.as_view(), name='cities'),
]