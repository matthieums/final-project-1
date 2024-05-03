# Generated by Django 5.0.3 on 2024-05-03 10:03

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Holiday',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hours', models.IntegerField(null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(999)])),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='remaining_hours', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
