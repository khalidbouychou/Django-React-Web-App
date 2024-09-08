from django.shortcuts import render

# Create your views here.


from django.contrib.auth.models import User
from rest_framework import generics 
from .serializers import UserSerializer

from  rest_framework.permissions import IsAuthenticated , AllowAny



class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() # get all the users
    serializer_class = UserSerializer# use the UserSerializer
    permission_classes = (AllowAny,) # allow any user to access this view