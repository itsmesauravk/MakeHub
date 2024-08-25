from django.contrib import admin
from .models import  Recipe, RecipeRating


admin.site.register(Recipe)
admin.site.register(RecipeRating)
