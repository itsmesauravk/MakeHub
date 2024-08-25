
from rest_framework import serializers
from .models import Recipe, RecipeRating

# Serializer for RecipeRating
class RecipeRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeRating
        fields = ['user', 'rating', 'comment']
class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'