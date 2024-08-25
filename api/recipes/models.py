from django.db import models
from accounts.models import RecipeOwner

class RecipeRating(models.Model):
    user  = models.ForeignKey(RecipeOwner, related_name='ratings_given', on_delete=models.CASCADE, null=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2)
    comment = models.TextField()
    recipe = models.ForeignKey('Recipe', related_name='ratings', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name} - {self.rating}'

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
    likes = models.ManyToManyField(RecipeOwner, related_name='liked_recipes', blank=True)  # Many-to-Many relationship for likes
    saved = models.ManyToManyField(RecipeOwner, related_name='saved_recipes', blank=True)  # Many-to-Many relationship for saved recipes
    views = models.PositiveIntegerField(default=0)
    rating = models.ManyToManyField(RecipeRating, related_name='ratings', blank=True)  # Many-to-Many relationship for ratings

    def __str__(self):
        return self.title

    @property
    def average_rating(self):
        ratings = self.ratings.all()
        if ratings.exists():
            return round(ratings.aggregate(models.Avg('rating'))['rating__avg'], 2)
        return 0.00
