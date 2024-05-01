from django.db import models
import datetime

# Create your models here.
class CurrentMonth(models.Model):
    month = models.IntegerField(default=datetime.datetime.now().month)