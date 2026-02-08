from rest_framework import serializers
from .models import Product, ProductImage, SubCategory, Order, OrderItem, Cart, CartItem
from django.db.models import Sum


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):

    images = ProductImageSerializer(many=True, read_only=True, source="product")

    class Meta:
        model = Product
        fields = ["name", "price", "images"]

    def create(self, validated_data):
        request = self.context["request"]
        validated_data["seller"] = request.user
        return super().create(validated_data)


class CategorySerializer(serializers.ModelSerializer):
    product = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = SubCategory
        fields = ["name", "product"]


class OrderItemSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField(read_only=True)
    price_per_unit = serializers.SerializerMethodField(read_only=True)
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = "__all__"

    def get_price_per_unit(self, obj):
        product = obj.product
        qs = Product.objects.get(product_id=product.product_id)
        return qs.price

    def get_total_price(self, obj):
        product = obj.product
        qs = Product.objects.get(product_id=product.product_id)
        amount = qs.price * obj.quantity
        return amount


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(read_only=True, many=True)

    class Meta:
        model = Order
        fields = [
            "order_number",
            "created_at",
            "order_items",
            "user",
            "total_amount",
            "tax_amount",
            "discount_amount",
            "shipping_charge",
            "final_amount",
            "status",
            "payment_status",
            "payment_method",
        ]


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"
