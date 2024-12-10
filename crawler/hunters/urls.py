from django.urls import path
from .views import squad_statistics_receive_view, duo_statistics_receive_view

urlpatterns = [
    path('statistics/squad', squad_statistics_receive_view, name='squad_statistics'),
    path('statistics/duo', duo_statistics_receive_view, name='duo_statistics'),
]
