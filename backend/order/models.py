from django.db import models
from account.models import User, UserAddress
from product.models import Product, Variant
import random
import string

# Create your models here.
class Order(models.Model):
    """Model for Order."""
    PENDING = 'Pending'
    PROCESSING = 'Processing'
    SHIPPED = 'shipped'
    COMPLETED = 'Completed'
    REFUNDED = 'Refunded'
    NOT_ORDERED = 'Not Ordered'

    STATUS_CHOICES = (
        (NOT_ORDERED, 'Not Ordered'),
        (PENDING, 'Pending'),
        (PROCESSING, 'Processing'),
        (SHIPPED, 'Shipped'),
        (COMPLETED, 'Completed'),
        (REFUNDED, 'Refunded'),
    )
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='User')
    address = models.ForeignKey(UserAddress, on_delete=models.SET_NULL, null=True, verbose_name='Address')
    address_post_code = models.CharField(max_length=20, blank=True, null=True, verbose_name='post code')
    code = models.CharField(max_length=10, editable=False, verbose_name='Order code')
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=NOT_ORDERED
    )
    full_name = models.CharField(max_length=50, blank=True)
    email = models.CharField(max_length=50, blank=True)
    phone = models.CharField(max_length=100, blank=True)
    ip = models.CharField(blank=True, max_length=20, verbose_name='IP')
    
    zarinpal_authority = models.CharField(max_length=50, blank=True, null=True)
    
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ('-created',)
    
    def __str__(self):
        return f"{self.user}"
    
    @classmethod
    def generate_code(cls):
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = self.generate_code()
        super().save(*args, **kwargs)

class OrderItem(models.Model):
    NEW = "New"
    ACCEPTED = "Accepted"
    CANCELED = "Canceled"
    STATUS = (
        (NEW, NEW),
        (ACCEPTED, ACCEPTED),
        (CANCELED, CANCELED),
    )
    order = models.ForeignKey(Order, on_delete=models.CASCADE, verbose_name='Order', related_name='order')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='User')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, verbose_name='Product')
    variant = models.ForeignKey(Variant, on_delete=models.SET_NULL, blank=True, null=True, verbose_name='Varaint')
    quantity = models.IntegerField(verbose_name='quantity')
    price = models.IntegerField(verbose_name='price')
    amount = models.IntegerField(verbose_name='total price')
    status = models.CharField(max_length=30, choices=STATUS, default='New', verbose_name='وضعیت')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.order} {self.product}"