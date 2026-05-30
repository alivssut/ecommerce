from django.shortcuts import render
from rest_framework import generics, status
from rest_framework_simplejwt import authentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from account.models import User, UserProfile, UserAddress
from location.models import Country, Region, City
from .serializers import (
    UserSerializer,
    UserProfileSerializer,
    UserAddressSerializer,
    CountrySerializer,
    RegionSerializer,
    CitySerializer,
)
# Create your views here.

# post list view
class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated,]
    queryset = User.objects.all()
    

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        profile, created = UserProfile.objects.get_or_create(user=self.request.user)
        return profile


class AddressListView(generics.ListCreateAPIView):
    serializer_class = UserAddressSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserAddress.objects.filter(user=self.request.user)


class AddressDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserAddressSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserAddress.objects.filter(user=self.request.user)


class SetDefaultAddressView(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        address = generics.get_object_or_404(UserAddress, pk=pk, user=request.user)
        UserAddress.objects.filter(user=request.user).update(selected=False)
        address.selected = True
        address.save()
        return Response({'message': 'آدرس پیش‌فرض تنظیم شد.'})


class CountryListView(generics.ListAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    authentication_classes = []
    permission_classes = []


class RegionListView(generics.ListAPIView):
    serializer_class = RegionSerializer
    authentication_classes = []
    permission_classes = []

    def get_queryset(self):
        country_id = self.request.query_params.get('country')
        if country_id:
            return Region.objects.filter(country_id=country_id)
        return Region.objects.none()


class CityListView(generics.ListAPIView):
    serializer_class = CitySerializer
    authentication_classes = []
    permission_classes = []

    def get_queryset(self):
        region_id = self.request.query_params.get('region')
        if region_id:
            return City.objects.filter(region_id=region_id)
        return City.objects.none()