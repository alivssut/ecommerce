import os
import random
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db import models
import uuid
from location.models import Country, Region, City

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

class UserProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name='name', related_name='profile')
    phone = models.CharField(blank=True, max_length=20, verbose_name='phone number')
    national_code = models.CharField(blank=True, max_length=20, verbose_name='national code', default='_')
    image = models.ImageField(blank=True, null=True, upload_to='user/profile', verbose_name='image')

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.user.username

    def user_name(self):
        return self.user.first_name + ' ' + self.user.last_name + ' ( ' + self.user.username + ' ) '


class UserAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='User')
    full_name = models.CharField(blank=True, max_length=60, verbose_name='full name')
    phone = models.CharField(blank=True, max_length=20, verbose_name='phone number')
    country = models.ForeignKey(Country, on_delete=models.CASCADE, verbose_name='country')
    province = models.ForeignKey(Region, on_delete=models.CASCADE, verbose_name='province')
    city = models.ForeignKey(City, on_delete=models.CASCADE, verbose_name='city')
    address = models.CharField(blank=True, max_length=250, verbose_name='post address')
    post_code = models.IntegerField(blank=True, verbose_name='post code', null=True)
    selected = models.BooleanField(default=False, verbose_name='selected address')

    def user_name(self):
        return self.full_name + ' ( ' + self.user.username + ' ) '

    class Meta:
        verbose_name = 'User Adress'
        verbose_name_plural = 'User Addresses'

    def __str__(self):
        return self.user.username
