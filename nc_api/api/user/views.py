from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from .models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout
import random
import re

def generate_session_token(length=10):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97,123)] + [str(i) for i in range(10)]) for _ in range(length))

@csrf_exempt
def signin(request):
    if not request.method == 'POST':
        return JsonResponse({"error" : True, "message" : "Send a Post request with valid parameter only"})
    email = request.POST['email']
    password = request.POST['password']

    if not re.match("^[\w\.-]+@[\w\.-]+\.\w{2,4}$", email):
        return JsonResponse({"error" : True, "message" : "Give a valid Email Id"})

    if len(password) < 5:
        return JsonResponse({"error" : True, "message" : "Password length must be Greater then 5"})
    
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(email=email)
        
        if user.check_password(password):
            user_dic = UserModel.objects.filter(email=email).values().first()
            user_dic.pop('password')

            if user.session_token != "0":
                user.session_token = "0"
                user.save()
                return JsonResponse({"error" : True, "message" : "Previous session exists"})

            token = generate_session_token()
            user.session_token = token
            user.save()
            login(request, user)
            return JsonResponse({'error' : False, 'message' : 'User Login Succesfully', "token" : token, 'user' : user_dic})

        else:
            return JsonResponse({"error" : True, "message" : "Invalid Password"})

    except UserModel.DoesNotExist:
        return JsonResponse({"error" : True, "message" : "Invalid Email"})


def signout(request, id):
    logout(request)

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = "0"
        user.save()
        return JsonResponse({"error" : False, 'message' : "Logout Successful"})
    except UserModel.DoesNotExist:
        return JsonResponse({"error" : True, "message" : "Invalid Id"})


class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create' : [AllowAny]}
    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer
    
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]