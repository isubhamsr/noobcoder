from django.urls import path, include
from rest_framework.authtoken import views
from api import views

urlpatterns = [
    path('', views.home, name='home')
]