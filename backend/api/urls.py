from django.urls import path, include

from .hello_world_view import HelloView
from .views import TaskInWorkListView, ProblemListView

urlpatterns = [
    path('task_in_work/', TaskInWorkListView.as_view()),
    path('problem/', ProblemListView.as_view()),
]