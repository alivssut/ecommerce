from django.db import models
from account.models import User
from slugify import slugify
from django.core.validators import MinValueValidator, MaxValueValidator
from unidecode import unidecode
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
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

class Brand(models.Model):
    """Brand model"""
    name = models.CharField(
        max_length=100,
        null=False,
        unique=True,
        blank=False,
        verbose_name='Brand name',
    )
    slug = models.SlugField(
        max_length=250,
        null=False,
        unique=True,
        blank=False,
        verbose_name='Brand Slug',
    )
    description = models.TextField(
        max_length=500,
        null=True,
        blank=True,
        verbose_name='Brand description',
    )
    is_active = models.BooleanField(
        default=False,
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Created at'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Updated at'
    )

    class Meta:
        """Meta class for Brand model"""
        verbose_name = 'Brand'
        verbose_name_plural = 'Brands'
        ordering = ['name']

    def __str__(self):
        """String representation of the model"""
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(unidecode(self.name), allow_unicode=True)
        super().save(*args, **kwargs)

    @classmethod
    def get_active_brands(cls):
        """Get active brands"""
        return cls.objects.filter(is_active=True)

    @classmethod
    def get_not_active_brands(cls):
        """Get not active brands"""
        return cls.objects.filter(is_active=False)

class Product(models.Model):
    PUBLISHED = "Published"
    PENDING_REVIEW = "Pending Review"
    DRAFT = "Draft"
    PUBLIC = "Public"
    PASSWORD_PROTECTED = "Password protected"
    PRIVATE = "Private"
    SIMPLE = "Simple"
    VARIABLE = "Variable"
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
    PRODUCT_TYPE_CHOICES = (
        (SIMPLE, SIMPLE),
        (VARIABLE, VARIABLE)
    )
    name = models.CharField(max_length=200, null=False, blank=False)
    sku = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(upload_to='product/image', verbose_name='image')
    price = models.IntegerField(verbose_name='price')
    description = models.TextField(
        max_length=500,
        null=True,
        blank=True,
        verbose_name='Product description',
    )
    brand = models.ForeignKey(
        Brand,
        on_delete=models.CASCADE,
        related_name='products',
        verbose_name='Brand',
        null=True,
        blank=True
    )
    amount = models.IntegerField(verbose_name='amount')
    category = models.ManyToManyField(Category, related_name='products', verbose_name='categories')
    slug = models.SlugField(verbose_name='slug', null=False, unique=True, allow_unicode=True, max_length=250)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default=PENDING_REVIEW, verbose_name='status')
    product_type = models.CharField(max_length=50, choices=PRODUCT_TYPE_CHOICES, default=SIMPLE, verbose_name='product type')
    visibility = models.CharField(max_length=50, choices=VISIBILITY_CHOICES, default=PUBLIC, verbose_name='visibility')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"{self.name}"

class ProductImage(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='images', verbose_name="Product")
    image = models.ImageField(upload_to='products/images/', verbose_name="Image")
    alt_text = models.CharField(max_length=255, blank=True, verbose_name="Alt Text")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")

    class Meta:
        verbose_name = "Product Image"
        verbose_name_plural = "Product Images"
        ordering = ['created_at']

    def __str__(self):
        return f"Image for {self.product.name}"

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
        
class ReviewRating(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('under_review', 'Under Review'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='reviews', verbose_name="Product")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews', verbose_name="User")
    subject = models.CharField(max_length=100, blank=True, verbose_name="Subject")
    review = models.TextField(max_length=500, blank=True, verbose_name="Review")
    rating = models.PositiveSmallIntegerField(verbose_name="Rating", validators=[
        MinValueValidator(1),
        MaxValueValidator(5)
    ])
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name="Status")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")

    def __str__(self):
        return f"{self.subject}"

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Review Rating"
        verbose_name_plural = "Review Ratings"