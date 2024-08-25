from django.urls import path
from .views import create_recipe, list_recipes


urlpatterns = [
    path('create-recipe/', create_recipe, name='create_recipe'),
    path('list-recipes/', list_recipes, name='list_recipes'),
]
