import django_filters.rest_framework
from rest_framework import generics

from .serializers import TaskInWorkSerializer, ProblemSerializer, ObjectSerializer
from .models import TaskInWork, Problem, Object


class TaskInWorkListView(generics.ListAPIView):
    queryset = TaskInWork.objects.all()
    serializer_class = TaskInWorkSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = [
        'type_of_work__local_id',
        'plan_date_start',
        'plan_date_end',
        'fact_date_start',
        'fact_date_end',
        'unom'
    ]


class ProblemListView(generics.ListAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = [
        'unom',
    ]


class ObjectListView(generics.ListAPIView):
    queryset = Object.objects.all()
    serializer_class = ObjectSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = [
        'adm_area',
        'district',
        'street',
        'house',
        'corpus',
        'composition',
        'structure',
        'col_770__local_id',
        'col_782',
    ]
