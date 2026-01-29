from django.contrib import admin
from .models import (
    Product,
    ProductImage,
    Rating,
    Order,
    OrderItem,
    Cart,
    CartItem,
    Category,
    WishList,
    SubCategory,
)

# Register your models here.

admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Cart)
admin.site.register(Rating)
admin.site.register(CartItem)
admin.site.register(Category)
admin.site.register(WishList)
admin.site.register(SubCategory)
