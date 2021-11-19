from django.urls import path, include
from rest_framework.routers import DefaultRouter
from restaurant import views


app_name = 'restaurant'
router = DefaultRouter()
router.register('', views.RestaurantViewSet, basename='restaurant')


urlpatterns = router.urls
