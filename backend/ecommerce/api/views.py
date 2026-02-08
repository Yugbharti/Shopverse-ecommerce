from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.generics import (
    ListCreateAPIView,
    ListAPIView,
    RetrieveUpdateDestroyAPIView,
    CreateAPIView,
)
from rest_framework.viewsets import ModelViewSet
from .models import Product, ProductImage, SubCategory, Order
from .serializers import (
    ProductSerializer,
    ProductImageSerializer,
    CategorySerializer,
    OrderSerializer,
)
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from accounts.permissions import IsSeller, IsSellerOwner, IsSellerOwnerImage
from rest_framework.views import APIView, Response
from rest_framework import status
from .filters import ProductFilter
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.


# GET list
class ProductListView(ListAPIView):
    queryset = Product.objects.select_related("category").all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    filterset_class = ProductFilter
    filter_backends = [SearchFilter, DjangoFilterBackend]
    search_fields = [
        "name",
        "description",
    ]


class CategoryListView(ListAPIView):
    queryset = SubCategory.objects.all()
    serializer_class = CategorySerializer


# Get single product retrieve update and destroy by id
class ProductRetrieveView(RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated(), IsAdminUser(), IsSellerOwner()]


# POST by seller only
class ProductCreateView(CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated(), IsSeller()]


class ProductImageDetailView(RetrieveUpdateDestroyAPIView):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]


class ProductImageCreateView(ListCreateAPIView):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = [IsSellerOwnerImage()]


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(request, self):
        data = {"response": "request is permitted."}
        return Response(data)


class ProductImageView(APIView):

    def get(self, request):
        data = ProductImage.objects.all()
        serializer = ProductImageSerializer(data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class OrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        qs = Order.objects.prefetch_related("order_items")
        data = qs.filter(user=request.user)
        serializer = OrderSerializer(data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class CartCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
