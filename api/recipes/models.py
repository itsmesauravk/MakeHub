from django.db import models
from accounts.models import RecipeOwner



class Recipe(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    summary = models.TextField()
    description = models.TextField()
    image = models.URLField()
    user = models.ForeignKey(RecipeOwner, related_name='recipes_created', on_delete=models.CASCADE, null=True)
    type = models.CharField(max_length=50, choices=[('Vegetarian', 'Vegetarian'), ('Non-Vegetarian', 'Non-Vegetarian')])
    ingredients = models.JSONField()
    method = models.JSONField()
    categories = models.JSONField()
    likes = models.ManyToManyField(RecipeOwner, related_name='liked_recipes_set', blank=True)  # No null=True
    saved = models.ManyToManyField(RecipeOwner, related_name='saved_recipes_set', blank=True)  # No null=True
    views = models.PositiveIntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)

    def __str__(self):
        return self.title
