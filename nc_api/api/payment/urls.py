from django.urls import path, include
from . import views

urlpatterns = [
    path('gettoken/<str:id>/<str:token>/', views.genarate_token, name='token.genarate'),
    path('process/<str:id>/<str:token>/', views.process_payment, name='payment.process'),
]