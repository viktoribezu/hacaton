from django.contrib import admin

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
                     TypeOfWork)
# Register your models here.
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
