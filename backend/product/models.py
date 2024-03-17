from django.db import models

# Create your models here.
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
    slug = models.SlugField(verbose_name='slug', null=False, unique=True, allow_unicode=True, max_length=250)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default=PENDING_REVIEW, verbose_name='status')
    visibility = models.CharField(max_length=50, choices=VISIBILITY_CHOICES, default=PUBLIC, verbose_name='visibility')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
