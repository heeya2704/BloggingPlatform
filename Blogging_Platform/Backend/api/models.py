from django.db import models
from django.contrib.auth.models import AbstractUser , User , Group,Permission
from django.utils import timezone

# Create your models here.
class User(AbstractUser):
    is_Creator = models.BooleanField(default=False)
    is_Member = models.BooleanField(default=False)

class Post(models.Model):
    image = models.ImageField(upload_to='api/images', null=True, blank=True)
    title = models.CharField(max_length=250)
    date_posted = models.DateTimeField(auto_now_add=True)
    categories = models.CharField(max_length=250)
    content = models.TextField()
    author=models.ForeignKey(User,on_delete=models.CASCADE)
    is_trending = models.BooleanField(default=False)
    
    def __str__(self) -> str:
        return str(self.author.username) +" | "+ str(self.title)

