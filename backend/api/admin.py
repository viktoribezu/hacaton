from django.contrib import admin

from .models import (ObjectType,
                     Object,
                     ProblemType,
                     Problem,
                     Predict,
                     AppealCitizen,
                     Executor,
                     TaskInWork)
# Register your models here.
admin.site.register(ObjectType)
admin.site.register(Object)
admin.site.register(ProblemType)
admin.site.register(Problem)
admin.site.register(Predict)
admin.site.register(AppealCitizen)
admin.site.register(Executor)
admin.site.register(TaskInWork)
