from django.urls import path, include

from .hello_world_view import HelloView
from .views import TaskInWorkListView

urlpatterns = [
    path('task_in_work/', TaskInWorkListView.as_view()),
]