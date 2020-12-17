from django.http import JsonResponse
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from .models import Order
from .serializers import OrderSerializer
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def validate_user_seassion(id, token):
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False

def add_order(request, id, token):
    if not validate_user_seassion(id, token):
        return JsonResponse({"error": True, "message" : "You need to login"})
    
    if request.method == "POST":
        user_id = id
        transaction_id = request.POST['transaction_id']
        product_names = request.POST['product_names']
        total_amount = request.POST['total_amount']

        total_products = len(product_names.split(',')[:-1])

        UserModel = get_user_model()

        try:
            user = UserModel.objects.get(pk=user_id)
            order = Order(user=user, product_names=product_names, total_products=total_products, transaction_id=transaction_id, total_amount=total_amount)
            order.save()
            return JsonResponse({'error' : False, 'message' : 'Order Placed Succesfully'})
        except UserModel.DoesNotExist:
            return JsonResponse({"error" : True, 'message' : 'User does not exist'})


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('id')
    serializer_class = OrderSerializer