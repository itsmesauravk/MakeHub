from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.core.validators import MaxValueValidator, MinValueValidator

class Recipe(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    summary = models.TextField()
    description = models.TextField()
    image = models.ImageField(upload_to='images/')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=[('Vegetarian', 'Vegetarian'), ('Non-Vegetarian', 'Non-Vegetarian')])
    ingredients = models.JSONField(default=list)
    method = models.JSONField(default=list)
    categories = models.JSONField(default=list)
    likes = models.ManyToManyField(User, related_name='liked_recipes', blank=True)
    saved = models.ManyToManyField(User, related_name='saved_recipes', blank=True)
    views = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class Rating(models.Model):
    recipe = models.ForeignKey(Recipe, related_name='ratings', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()

    def __str__(self):
        return f'{self.user.username} - {self.recipe.title} - {self.rating}'

