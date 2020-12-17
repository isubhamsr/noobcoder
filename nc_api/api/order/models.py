from django.db import models
from api.user.models import CustomUser
from api.product.models import Product

# Create your models here.

class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product_names = models.TextField()
    total_products = models.TextField(default=0)
    transaction_id = models.CharField(max_length=255, default=0)
    total_amount = models.CharField(max_length=255, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)