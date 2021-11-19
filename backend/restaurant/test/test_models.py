from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from restaurant.models import Restaurant
from restaurant.serializers import RestaurantSerializer

RESTAURANT_URL = reverse('restaurant:restaurant-list')


class TestRestaurant(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_create_restaurant(self):
        """Test if the restaurant is being created"""

        payload = {
            'name': "Sazon la viña",
            'country': "Venezuela",
            'state': "Carabobo",
            'type_food': "sopa",
            'rating': 2,
            'is_visited': True,
        }

        request = self.client.post(RESTAURANT_URL, payload)
        exists = Restaurant.objects.filter(
            name=payload['name']
        ).exists()

        self.assertEqual(request.status_code, status.HTTP_201_CREATED)
        self.assertTrue(exists)

    def test_list_restaurants(self):
        """Test for get all restaurant list"""
        Restaurant.objects.create(
            name="Sazon la viña",
            country='Venezuela',
            state='Carabobo',
            type_food='Sopa',
            rating=2,
            is_visited=True
        )

        Restaurant.objects.create(
            name="Hamburgesas Krusty",
            country='USA',
            state='Springfield',
            type_food='Hamburguesas',
            rating=None,
            is_visited=False
        )

        request = self.client.get(RESTAURANT_URL)

        restaurants = Restaurant.objects.all()
        serialized_data = RestaurantSerializer(restaurants, many=True)

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data, serialized_data.data)

    def test_filter_restaurants(self):
        """Test for all the query paramters accepted """
        Restaurant.objects.create(
            name="Sazon la viña",
            country='Venezuela',
            state='Carabobo',
            type_food='Sopa',
            rating=2,
            is_visited=True
        )

        Restaurant.objects.create(
            name="Hamburgesas Krusty",
            country='USA',
            state='Springfield',
            type_food='Hamburguesas',
            rating=None,
            is_visited=False
        )

        Restaurant.objects.create(
            name="Ensaladas Cesar",
            country='Venezuela',
            state='Valencia',
            type_food='Ensaladas',
            rating=4,
            is_visited=True
        )

        Restaurant.objects.create(
            name="McDonalds",
            country='USA',
            state='Texas',
            type_food='Hamburguesas',
            rating=2,
            is_visited=True
        )

        Restaurant.objects.create(
            name="Wendys",
            country='USA',
            state='Texas',
            type_food='Hamburguesas',
            rating=2,
            is_visited=True
        )

        query_country = f'{RESTAURANT_URL}?country=Venezuela'
        query_state = f'{RESTAURANT_URL}?state=Valencia'
        query_type_food = f'{RESTAURANT_URL}?type_food=Hamburguesas'
        query_rating = f'{RESTAURANT_URL}?rating=2'
        query_multiple_params = f'{RESTAURANT_URL}?country=USA&type_food=Hamburguesas'

        request = self.client.get(RESTAURANT_URL)

        request = self.client.get(query_country)
        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(len(request.data), 2)

        request = self.client.get(query_state)
        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(len(request.data), 1)

        request = self.client.get(query_type_food)
        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(len(request.data), 3)

        request = self.client.get(query_rating)
        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(len(request.data), 3)

        request = self.client.get(query_multiple_params)
        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(len(request.data), 3)

    def test_destroy_restaurant(self):
        new_restaurant = Restaurant.objects.create(
            name="Wendys",
            country='USA',
            state='Texas',
            type_food='Hamburguesas',
            rating=2,
            is_visited=True
        )

        url = reverse('restaurant:restaurant-detail',
                      kwargs={'pk': new_restaurant.pk})
        request = self.client.delete(f'{url}')
        self.assertEqual(request.status_code, status.HTTP_204_NO_CONTENT)

        request = self.client.get(RESTAURANT_URL)
        self.assertEqual(len(request.data), 0)

    def test_update_restaurant(self):
        new_restaurant = Restaurant.objects.create(
            name="Wendys",
            country='USA',
            state='Texas',
            type_food='Hamburguesas',
            rating=2,
            is_visited=True
        )

        url = reverse('restaurant:restaurant-detail',
                      kwargs={'pk': new_restaurant.pk})

        request = self.client.patch(url, {'name': 'Arturos'})

        self.assertEqual(request.status_code, status.HTTP_200_OK)
