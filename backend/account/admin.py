from django.contrib import admin
from .models import User, UserProfile, UserAddress

# Register your models here.

admin.site.register(Country)
admin.site.register(Region)
admin.site.register(City)