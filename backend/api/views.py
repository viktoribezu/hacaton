import django_filters.rest_framework
from rest_framework import generics

from .serializers import TaskInWorkSerializer, ProblemSerializer, ObjectSerializer
from .models import TaskInWork, Problem, Object


class TaskInWorkListView(generics.ListAPIView):
    queryset = TaskInWork.objects.all()
    serializer_class = TaskInWorkSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = {
        'type_of_work__local_id': ["in", "exact", "icontains", "isnull"],
        'plan_date_start': ["in", "exact", "icontains", "isnull"],
        'plan_date_end': ["in", "exact", "icontains", "isnull"],
        'fact_date_start': ["in", "exact", "icontains", "isnull"],
        'fact_date_end': ["in", "exact", "icontains", "isnull"],
        'unom': ["in", "exact", "icontains", "isnull"]
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
        'adm_area': ["in", "exact", "icontains", "isnull"],
        'district': ["in", "exact", "icontains", "isnull"],
        'street': ["in", "exact", "icontains", "isnull"],
        'house': ["in", "exact", "icontains", "isnull"],
        'corpus': ["in", "exact", "icontains", "isnull"],
        'composition': ["in", "exact", "icontains", "isnull"],
        'structure': ["in", "exact", "icontains", "isnull"],
        'col_770__local_id': ["in", "exact", "icontains", "isnull"],
        'col_782': ["in", "exact", "icontains", "isnull"],
    }
