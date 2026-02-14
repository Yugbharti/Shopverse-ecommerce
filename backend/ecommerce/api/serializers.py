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


class CartItemSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source="product", read_only=True)
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = CartItem
        fields = ["product", "product_details", "cart", "quantity", "price_at_time"]
        # ADD THIS:
        read_only_fields = ["cart", "price_at_time"]

    def create(self, validated_data):
        user = self.context["request"].user
        cart, _ = Cart.objects.get_or_create(user=user)

        product = validated_data["product"]
        quantity = validated_data.get("quantity", 1)

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={"price_at_time": product.price, "quantity": quantity},
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        return cart_item


class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(read_only=True, many=True)

    class Meta:
        model = Cart
        fields = ["user", "cart_items"]
