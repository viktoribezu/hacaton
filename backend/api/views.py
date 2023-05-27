import django_filters.rest_framework
from rest_framework import generics

from .serializers import TaskInWorkSerializer, ProblemSerializer, ObjectSerializer
from .models import TaskInWork, Problem, Object


class TaskInWorkListView(generics.ListAPIView):
    queryset = TaskInWork.objects.all()
    serializer_class = TaskInWorkSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = {
        'type_of_work__local_id': ["in", "exact"],
        'plan_date_start': ["in", "exact"],
        'plan_date_end': ["in", "exact"],
        'fact_date_start': ["in", "exact"],
        'fact_date_end': ["in", "exact"],
        'unom': ["in", "exact"]
    }


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
    filterset_fields = {
        'adm_area': ["in", "exact"],
        'district': ["in", "exact"],
        'street': ["in", "exact"],
        'house': ["in", "exact"],
        'corpus': ["in", "exact"],
        'composition': ["in", "exact"],
        'structure': ["in", "exact"],
        'col_770__local_id': ["in", "exact"],
        'col_782': ["in", "exact"],
    }
