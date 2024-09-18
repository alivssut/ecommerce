from django.contrib import admin
from .models import Product, Category, Attribute, ProductAttribute, Variant, Brand, ProductImage, ReviewRating
from django import forms
# Register your models here.

admin.site.register(Category)
admin.site.register(Attribute)
admin.site.register(ProductAttribute)
admin.site.register(Variant)
admin.site.register(Brand)
admin.site.register(ProductImage)
admin.site.register(ReviewRating)

class ProductAdmin(admin.ModelAdmin):
    readonly_fields  = ("slug",)
admin.site.register(Product, ProductAdmin)
