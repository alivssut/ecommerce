from django.db import models
from account.models import User
from order.models import Order

# Create your models here.
class Payment(models.Model):
    SUCCESS = "Success"
    PENDING = "Pending"
    CANCELED = "Canceled"
    FAILED = "Failed"
    REFUNDED = "Refunded"
    EXPIRED = "Expired"
    STATUS = (
        (SUCCESS, SUCCESS),
        (PENDING, PENDING),
        (CANCELED, CANCELED),
        (FAILED, FAILED),
        (REFUNDED, REFUNDED),
        (EXPIRED, EXPIRED),
    )
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='User')
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, verbose_name='Order')
    amount = models.IntegerField(verbose_name='amount')
    status = models.CharField(max_length=30, choices=STATUS, default='New', verbose_name='status')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)