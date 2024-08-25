from rest_framework import serializers
from .models import RecipeOwner
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework import exceptions


class RecipeOwnerSerializer(serializers.ModelSerializer):
    #for registration
    class Meta:
        model = RecipeOwner
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    #for login
    class RecipeOwnerLoginSerializer(serializers.ModelSerializer):
        class Meta:
            model = RecipeOwner
            fields = ['email', 'password']

    
    # for token
    class TokenObtainPairSerializer(TokenObtainPairSerializer):
        def validate(self, attrs):
            email = attrs.get('email')
            password = attrs.get('password')
            
            if email and password:
                user = authenticate(request=self.context.get('request'), email=email, password=password)

                if not user:
                    raise exceptions.AuthenticationFailed('No active user found')
            else:
                raise exceptions.ValidationError('Must include "email" and "password".')
            
            refresh = self.get_token(user)

            data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }

            serializer = RecipeOwnerSerializer(user).data
            for k, v in serializer.items():
                data[k] = v
            
            return data