import django_filters.rest_framework
from rest_framework import generics

from .serializers import TaskInWorkSerializer, ProblemSerializer
from .models import TaskInWork, Problem


class TaskInWorkListView(generics.ListAPIView):
    queryset = TaskInWork.objects.all()
    serializer_class = TaskInWorkSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = [
        'type_of_work__local_id',
        'object__adm_area',
        'object__district',
        'object__street',
        'object__house',
        'object__corpus',
        'object__composition',
        'object__structure',
        'object__col_770__local_id',
        'plan_date_start',
        'plan_date_end',
        'fact_date_start',
        'fact_date_end',
    ]


class ProblemListView(generics.ListAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = [
        'unom',
    ]
