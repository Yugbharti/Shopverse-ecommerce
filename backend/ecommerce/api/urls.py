from django.urls import path
from . import views

urlpatterns = [
    # GET
    path("products/", views.ProductListView.as_view()),
    # GET
    path("products/<uuid:pk>", views.ProductRetrieveView.as_view()),
    path("product/images/<uuid:pk>/", views.ProductImageDetailView.as_view()),
    path("protected_view/", views.ProtectedView.as_view()),
    path("products/images", views.ProductImageView.as_view()),
    path("orders/", views.OrdersView.as_view()),
]
