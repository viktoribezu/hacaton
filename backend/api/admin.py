from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from authemail.admin import EmailUserAdmin

from .models import (Users,
                     ObjectType,
                     Object,
                     ProblemType,
                     Problem,
                     Predict,
                     AppealCitizen,
                     Executor,
                     TaskInWork)


class MyUserAdmin(EmailUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff',
                                    'is_superuser', 'is_verified',
                                    'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )


# Register your models here.
admin.site.unregister(Users)
admin.site.register(Users, MyUserAdmin)
admin.site.register(ObjectType)
admin.site.register(Object)
admin.site.register(ProblemType)
admin.site.register(Problem)
admin.site.register(Predict)
admin.site.register(AppealCitizen)
admin.site.register(Executor)
admin.site.register(TaskInWork)
