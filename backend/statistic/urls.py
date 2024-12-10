from django.urls import path, include
from rest_framework.routers import DefaultRouter

from statistic.views import UpdateHunterStatisticsForCrawler, HunterStatisticViewSet

router = DefaultRouter()
router.register(r'hunter_statistics', HunterStatisticViewSet, basename='hunter_statistics')

urlpatterns = [
    path('', include(router.urls)),
    path("hunter_statistics/crawler", UpdateHunterStatisticsForCrawler.as_view(), name="hunter_statistic_update_api"),
]