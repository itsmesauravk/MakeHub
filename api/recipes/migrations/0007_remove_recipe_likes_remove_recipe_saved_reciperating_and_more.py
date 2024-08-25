# Generated by Django 5.1 on 2024-08-25 08:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
        ('recipes', '0006_remove_recipe_likes_remove_recipe_saved_recipe_likes_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipe',
            name='likes',
        ),
        migrations.RemoveField(
            model_name='recipe',
            name='saved',
        ),
        migrations.CreateModel(
            name='RecipeRating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.DecimalField(decimal_places=2, max_digits=3)),
                ('comment', models.TextField()),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ratings', to='recipes.recipe')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ratings_given', to='accounts.recipeowner')),
            ],
        ),
        migrations.AddField(
            model_name='recipe',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='liked_recipes', to='accounts.recipeowner'),
        ),
        migrations.AddField(
            model_name='recipe',
            name='saved',
            field=models.ManyToManyField(blank=True, related_name='saved_recipes', to='accounts.recipeowner'),
        ),
    ]
