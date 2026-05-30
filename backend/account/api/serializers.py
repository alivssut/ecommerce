from rest_framework import serializers
from account.models import User, UserProfile, UserAddress
from location.models import Country, Region, City

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email"]

class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']
        

class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = UserProfile
        fields = ('id', 'phone', 'national_code', 'image', 'email', 'first_name', 'last_name', 'username')

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        user = instance.user
        if 'first_name' in user_data:
            user.first_name = user_data['first_name']
        if 'last_name' in user_data:
            user.last_name = user_data['last_name']
        user.save()
        return super().update(instance, validated_data)


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('id', 'name', 'display_name')


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ('id', 'name', 'display_name')


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('id', 'name', 'display_name')


class UserAddressSerializer(serializers.ModelSerializer):
    country_detail = CountrySerializer(source='country', read_only=True)
    province_detail = RegionSerializer(source='province', read_only=True)
    city_detail = CitySerializer(source='city', read_only=True)

    class Meta:
        model = UserAddress
        fields = (
            'id', 'full_name', 'phone', 'country', 'province', 'city',
            'address', 'post_code', 'selected',
            'country_detail', 'province_detail', 'city_detail'
        )
        read_only_fields = ('user',)

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)