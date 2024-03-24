from django.contrib import admin
from .models import Product, Category, Attribute, ProductAttribute, Variant

# Register your models here.

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Attribute)
admin.site.register(ProductAttribute)
admin.site.register(Variant)