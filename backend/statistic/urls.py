from django.urls import path, include
from rest_framework.routers import DefaultRouter

from statistic.views import UpdateHunterStatisticsForCrawler, HunterStatisticViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'hunter_statistics', HunterStatisticViewSet, basename='hunter_statistics')

urlpatterns = [
    path('', include(router.urls)),
    path(r'crawler/hunter_statistics', UpdateHunterStatisticsForCrawler.as_view(), name="hunter_statistic_update_api"),
]