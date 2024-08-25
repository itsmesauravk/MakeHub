# Generated by Django 5.1 on 2024-08-25 06:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
        ('recipes', '0003_remove_recipe_user_remove_recipe_saved_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='likes',
            field=models.ManyToManyField(blank=True, null=True, related_name='liked_recipes_set', to='accounts.recipeowner'),
        ),
        migrations.AddField(
            model_name='recipe',
            name='saved',
            field=models.ManyToManyField(blank=True, null=True, related_name='saved_recipes_set', to='accounts.recipeowner'),
        ),
        migrations.AddField(
            model_name='recipe',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='recipes_created', to='accounts.recipeowner'),
        ),
    ]