from django.db import models


# Create your models here.
class RecipeOwner(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    bio = models.TextField()
    image = models.ImageField(upload_to='profile_pics', default='https://freedesignfile.com/upload/2019/11/Professionals-cook-vector.jpg')

    def __str__(self):
        return self.first_name + ' ' + self.last_name