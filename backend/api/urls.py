from django.urls import path, include

from .hello_world_view import HelloView
from .views import TaskInWorkListView, ProblemListView, ObjectListView

urlpatterns = [
    path('task_in_work/', TaskInWorkListView.as_view()),
    path('problem/', ProblemListView.as_view()),
    path('object/', ObjectListView.as_view()),
]