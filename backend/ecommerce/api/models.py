from django.db import models
import uuid
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import Sum


# Create your models here.
class Category(models.Model):
    category_name = models.CharField(max_length=27)
    description = models.TextField(max_length=200)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.category_name


class SubCategory(models.Model):
    category_name = models.CharField(max_length=27)
    parent_category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField(max_length=200)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.category_name


class Product(models.Model):
    product_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=40)
    seller = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="products",
        limit_choices_to={"role": "seller"},
    )
    description = models.TextField(max_length=500)
    brand_name = models.CharField(max_length=20)
    price = models.PositiveIntegerField()
    discount_price = models.PositiveIntegerField(blank=True, null=True)
    category = models.ForeignKey(
        SubCategory, on_delete=models.CASCADE, null=True, blank=True
    )
    stock_quantity = models.PositiveIntegerField()
    is_available = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}"


class Rating(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)], default=5
    )
    review = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)


class ProductImage(models.Model):
    image_id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="product"
    )
    image_url = models.URLField()


class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price_at_time = models.PositiveIntegerField()


class Order(models.Model):
    class StatusChoices(models.TextChoices):
        PN = "pending"
        PD = "paid"
        SH = "shipped"
        DL = "delivered"
        CN = "cancelled"

    class PaymentChoices(models.TextChoices):
        PN = "pending"
        SC = "success"
        FL = "failed"

    class PaymentmethodChoices(models.TextChoices):
        UPI = "upi"
        CRD = "card"
        NBN = "net-banking"
        WLT = "wallet"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    order_number = models.UUIDField(unique=True, editable=False, default=uuid.uuid4)
    total_amount = models.PositiveIntegerField(default=0)
    tax_amount = models.PositiveIntegerField(default=0)
    shipping_charge = models.PositiveIntegerField(default=50)
    discount_amount = models.PositiveIntegerField(default=0)
    final_amount = models.PositiveIntegerField(default=0)
    status = models.CharField(
        max_length=20, choices=StatusChoices, default=StatusChoices.PN
    )
    payment_status = models.CharField(
        max_length=20, choices=PaymentChoices, default=PaymentChoices.PN
    )
    payment_method = models.CharField(
        max_length=20, choices=PaymentmethodChoices, default=PaymentmethodChoices.UPI
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def calculate_total_amount(self):
        items = self.order_items.all()
        price = items.aggregate(Sum("total_price"))["total_price__sum"]
        return price or 0

    def calculate_final_amount(self):
        return (
            self.total_amount
            + self.tax_amount
            + self.shipping_charge
            - self.discount_amount
        )

    def save(self, *args, **kwargs):
        if not self.pk:
            super().save(*args, **kwargs)

        self.total_amount = self.calculate_total_amount()
        self.final_amount = self.calculate_final_amount()
        super().save(update_fields=["total_amount", "final_amount"])


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="order_items"
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price_per_unit = models.PositiveIntegerField(default=0)
    total_price = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        self.price_per_unit = self.product.price
        self.total_price = self.price_per_unit * self.quantity
        super().save(*args, **kwargs)
        self.order.save()


class WishList(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)
