from rest_framework import viewsets
from rest_framework.filters import BaseFilterBackend
from rest_framework.response import Response
from rest_framework.views import APIView

from statistic.models import HunterStatistics
from statistic.serializer import HunterStatisticsSerializer


class MetaTagFilter(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        meta_tag = request.query_params.get('meta_tag')
        if meta_tag:
            return queryset.filter(meta_tag=meta_tag)

        return queryset


class HunterStatisticViewSet(viewsets.ModelViewSet):
    queryset = HunterStatistics.objects.all()
    serializer_class = HunterStatisticsSerializer
    filter_backends = [MetaTagFilter]


class UpdateHunterStatisticsForCrawler(APIView):

    def post(self, request):
        meta_tag = request.query_params.get('meta_tag')
        if not meta_tag:
            return Response({'error': 'meta_tag is required'}, status=400)

        HunterStatistics.objects.filter(meta_tag=meta_tag).delete()

        hunter_data_list = request.data
        new_hunters = []

        for hunter_data in hunter_data_list:
            hunter_data['meta_tag'] = meta_tag  # meta_tag 추가
            new_hunter = HunterStatistics.objects.create(**hunter_data)
            new_hunters.append(new_hunter)

        serializer = HunterStatisticsSerializer(new_hunters, many=True)
        return Response(serializer.data, status=201)
