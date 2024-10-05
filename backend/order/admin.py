from django.contrib import admin
from .models import Order, OrderItem

# Register your models here.

class OrderAdmin(admin.ModelAdmin):
    readonly_fields  = ("user",)
admin.site.register(Order, OrderAdmin)

class OrderItemAdmin(admin.ModelAdmin):
    readonly_fields  = ("order",)
admin.site.register(OrderItem, OrderItemAdmin)