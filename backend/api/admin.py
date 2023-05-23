from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from authemail.admin import EmailUserAdmin

from .models import (MCDCategory,
                     MCDManagementStatus,
                     MCDStatus,
                     TypeHousingStock,
                     TypeSocialObject,
                     RoofMaterial,
                     OrderRoofCleaning,
                     SignBuildingAccident,
                     WallMaterial,
                     ProjectSeries,
                     Object,
                     ProblemType,
                     Problem,
                     Predict,
                     TaskInWork,
                     TypeOfWork,
                     Users)


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
admin.site.register(MCDCategory)
admin.site.register(MCDManagementStatus)
admin.site.register(MCDStatus)
admin.site.register(TypeHousingStock)
admin.site.register(TypeSocialObject)
admin.site.register(RoofMaterial)
admin.site.register(OrderRoofCleaning)
admin.site.register(SignBuildingAccident)
admin.site.register(WallMaterial)
admin.site.register(ProjectSeries)
admin.site.register(Object)
admin.site.register(ProblemType)
admin.site.register(Problem)
admin.site.register(Predict)
admin.site.register(TaskInWork)
admin.site.register(TypeOfWork)
