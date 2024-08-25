from rest_framework import viewsets
from .models import Recipe, RecipeRating
from .serializers import RecipeSerializer, RecipeRatingSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


# Create recipe
@api_view(['POST'])
def create_recipe(request):
    serializer = RecipeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# List all recipes
@api_view(['GET'])
def list_recipes(request):
    recipes = Recipe.objects.all()
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
