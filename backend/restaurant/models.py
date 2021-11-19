from django.db import models


class Restaurant(models.Model):
    """Model for restaurant"""

    name = models.CharField(max_length=255, null=False, blank=False)
    country = models.CharField(max_length=255, null=False, blank=False)
    state = models.CharField(max_length=255, null=False, blank=False)
    type_food = models.CharField(max_length=255, null=False, blank=False)
    rating = models.IntegerField(null=True)
    is_visited = models.BooleanField(default=False)
