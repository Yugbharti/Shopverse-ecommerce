from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    class RoleChoices(models.TextChoices):
        AD = "admin"
        CS = "customer"
        SL = "seller"

    username = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True, unique=True)
    is_verified = models.BooleanField(default=False)
    role = models.CharField(choices=RoleChoices, default=RoleChoices.CS)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]


class Address(models.Model):
    class TypeChoices(models.TextChoices):
        HME = "home"
        OFF = "office"

    address = models.TextField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    city = models.CharField(max_length=40)
    state = models.CharField(max_length=20)
    country = models.CharField(max_length=20)
    postal_code = models.CharField(max_length=10)
    address_type = models.CharField(choices=TypeChoices)
    is_default = models.BooleanField(default=True)
