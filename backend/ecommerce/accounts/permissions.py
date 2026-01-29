from rest_framework.permissions import BasePermission
from .models import User


class IsSeller(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == User.RoleChoices.SL


class IsSellerOwnerImage(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_authenticated and obj.product.seller == request.user


class IsSellerOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_authenticated and obj.seller == request.user


class IsUser(BasePermission):
    message = "Not Allowed to update others information"

    def has_permission(self, request, view):
        def has_object_permission(self, request, view, obj):
            return request.user.is_authenticated and obj.user == request.user
