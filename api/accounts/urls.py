from django.urls import path
from .views import register_user, login_user

urlpatterns = [
    path('register-user/', register_user, name='register'),
    path('login-user/', login_user, name='login'),
]