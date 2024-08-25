from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import RecipeOwner
from .serializers import RecipeOwnerSerializer, TokenObtainPairSerializer

#test
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny


# Create your views here.

# for registration
# @api_view(['POST'])
# def register_user(request):
#     serializer = RecipeOwnerSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
# @authentication_classes([])  # Override global authentication settings
# @permission_classes([AllowAny])  # Allow any user to access this view
def register_user(request):
    serializer = RecipeOwnerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# for login
@api_view(['POST'])
# @authentication_classes([])  # Override global authentication settings
# @permission_classes([AllowAny])  # Allow any user to access this view
def login_user(request):
    serializer = TokenObtainPairSerializer(data=request.data)
    if serializer.is_valid():
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
