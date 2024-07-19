from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Manage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    email_or_username = models.CharField(max_length=1000)
    password = models.CharField(max_length=200)
    website = models.URLField(max_length=2000,default="")

class pin(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True,unique=True)
    pin = models.CharField(max_length=100)