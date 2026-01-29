from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path("register/", views.register.as_view()),
    path("login/", TokenObtainPairView.as_view()),
    path("users/", views.UserListView.as_view()),
    path("profile/users/me", views.UserProfileView.as_view()),
]
