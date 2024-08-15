from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Users(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bio = models.TextField()
    prfileImage = models.ImageField(upload_to='images/')
    recipesPosted = models.JSONField(default=list , blank=True, null=True)
    myLikes = models.JSONField(default=list, blank=True, null=True)
    mySaved = models.JSONField(default=list, blank=True, null=True)
    following = models.JSONField(default=list, blank=True, null=True)
    followers = models.JSONField(default=list, blank=True, null=True)
    otp = models.CharField(max_length=6, blank=True, null=True)
    refreshToken = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.username}"
