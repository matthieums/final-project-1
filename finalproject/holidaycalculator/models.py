from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Holiday(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="remaining_hours")
    hours = models.IntegerField(null=True, validators=[MinValueValidator(0), MaxValueValidator(999)])
    # updatedhours? Or will this be cached?