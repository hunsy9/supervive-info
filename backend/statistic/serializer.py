from rest_framework import serializers

from statistic.models import HunterStatistics

class HunterStatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HunterStatistics
        fields = '__all__'