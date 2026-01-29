from rest_framework.generics import (
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
    UpdateAPIView,
    RetrieveAPIView,
    ListAPIView,
)
from .models import User, Address
from .serializers import UserSerializer, AddressSerializer
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from accounts.permissions import IsUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from api.models import Order


# Create your views here.
class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = IsAdminUser


class register(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User created successfully.", "data": serializer.data},
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        total_orders = Order.objects.filter(id=user.id).count()
        return Response(
            {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "phone": user.phone,
                "role": user.role,
                "total_orders": total_orders,
            }
        )
