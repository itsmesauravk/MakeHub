from django.shortcuts import render
from .models import Users

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import UsersSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# Create your views here.

#registring user
@api_view(['POST'])
def registerUser(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    #check if user already exists
    user = Users.objects.filter(username=username).first()
    if user:
        return Response({
            "message": "User Already Exists"
        }, status=status.HTTP_400_BAD_REQUEST)
    #create user
    user = Users.objects.create(
        username=username, 
        email=email
    )
    user.set_password(password)
    user.save()

    return Response({
        "message": "User Registered Successfully",
        "data": UsersSerializer(user).data
    }, status=status.HTTP_201_CREATED)


    




#login user
@api_view(['POST'])
def loginUser(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = Users.objects.filter(username=username).first()
    if user is None:
        return Response({
            "message": "User Not Found"
        }, status=status.HTTP_404_NOT_FOUND)
    if user.password != password:
        return Response({
            "message": "Incorrect Password"
        }, status=status.HTTP_400_BAD_REQUEST)
    return Response({
        "message": "User Logged In Successfully",
        "data": UsersSerializer(user).data
    }, status=status.HTTP_200_OK)


