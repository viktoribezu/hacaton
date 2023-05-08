import django_filters.rest_framework
from rest_framework import generics

from .serializers import TaskInWorkSerializer
from .models import TaskInWork


class TaskInWorkListView(generics.ListAPIView):
    queryset = TaskInWork.objects.all()
    serializer_class = TaskInWorkSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['status', 'problem__object__address', 'problem__type']
