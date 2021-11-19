from rest_framework import viewsets

from restaurant.models import Restaurant
from restaurant.serializers import RestaurantSerializer


class RestaurantViewSet(viewsets.ModelViewSet):
    """Viewset for Restaurant"""
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        """
         Manage the different query paramters
         for filter the restaurant list

         In this case, the backend will filter all
         parameters except name. Filter for name
         will be in the frontend

        """
        queryset = Restaurant.objects.all()

        country = self.request.query_params.get('country')
        state = self.request.query_params.get('state')
        type_food = self.request.query_params.get('type_food')
        rating = self.request.query_params.get('rating')
        is_visited = self.request.query_params.get('is_visited')

        if country is not None:
            queryset = queryset.filter(country=country)

        if state is not None:
            queryset = queryset.filter(state=state)

        if type_food is not None:
            queryset = queryset.filter(type_food=type_food)

        if rating is not None:
            queryset = queryset.filter(rating=rating)

        return queryset
