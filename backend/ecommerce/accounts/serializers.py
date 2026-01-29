from rest_framework import serializers
from .models import User, Address
from django.core.validators import MinLengthValidator
from api.models import Order


class UserSerializer(serializers.ModelSerializer):
    total_orders = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["username", "password", "email", "phone", "total_orders"]

    def get_total_orders(self, obj):
        return Order.objects.filter(user=obj).count()

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"
