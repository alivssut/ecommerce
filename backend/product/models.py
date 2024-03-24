from django.db import models

# Create your models here.

# Catagory model
class Category(models.Model):
    parent = models.ForeignKey('self', related_name='children', on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=200, null=True)
    slug = models.SlugField(null=True)
    image = models.ImageField(upload_to='category/image', verbose_name='image')
    description = models.CharField(max_length=150, null=True,blank=True, verbose_name='Description')
    is_active = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.name) 
    
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


class Product(models.Model):
    PUBLISHED = "Published"
    PENDING_REVIEW = "Pending Review"
    DRAFT = "Draft"
    PUBLIC = "Public"
    PASSWORD_PROTECTED = "Password protected"
    PRIVATE = "Private"
    STATUS_CHOICES = (
        (PUBLISHED, PUBLISHED),
        (PENDING_REVIEW, PENDING_REVIEW),
        (DRAFT, DRAFT)
    )
    VISIBILITY_CHOICES = (
        (PUBLIC, PUBLIC),
        (PASSWORD_PROTECTED, PASSWORD_PROTECTED),
        (PRIVATE, PRIVATE)
    )
    name = models.CharField(max_length=200, null=False, blank=False)
    sku = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(upload_to='product/image', verbose_name='image')
    price = models.IntegerField(verbose_name='price')
    amount = models.IntegerField(verbose_name='amount')
    category = models.ManyToManyField(Category, related_name='products', verbose_name='categories')
    slug = models.SlugField(verbose_name='slug', null=False, unique=True, allow_unicode=True, max_length=250)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default=PENDING_REVIEW, verbose_name='status')
    visibility = models.CharField(max_length=50, choices=VISIBILITY_CHOICES, default=PUBLIC, verbose_name='visibility')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

class Attribute(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    slug = models.SlugField(verbose_name='slug', null=False, unique=True, allow_unicode=True, max_length=250)
    
    class Meta:
        verbose_name = 'Attribute'
        verbose_name_plural = 'Attributes'
    
class ProductAttribute(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_attribute', verbose_name='product')
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE, null=True, blank=True, related_name='attribute', verbose_name='attribute')
    name = models.CharField(max_length=200, null=True, blank=True)
    value = models.CharField(max_length=200, null=False, blank=False)
    
    class Meta:
        verbose_name = 'Product Attribute'
        verbose_name_plural = 'Product Attributes'

class Variant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variation', verbose_name='product')
    sku = models.CharField(max_length=200, null=True, blank=True)
    product_attribute = models.ManyToManyField(ProductAttribute, related_name='product_attribute', verbose_name='product attribute')
    quantity = models.IntegerField(default=1, verbose_name='quantity')
    price = models.IntegerField(default=0, verbose_name='price')
    
    class Meta:
        verbose_name = 'Variant'
        verbose_name_plural = 'Variants'