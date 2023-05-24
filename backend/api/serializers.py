from rest_framework import serializers

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


class MCDCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MCDCategory
        fields = '__all__'


class MCDManagementStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = MCDManagementStatus
        fields = '__all__'


class MCDStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = MCDStatus
        fields = '__all__'


class TypeHousingStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeHousingStock
        fields = '__all__'


class TypeSocialObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeSocialObject
        fields = '__all__'


class RoofMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoofMaterial
        fields = '__all__'


class OrderRoofCleaningSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderRoofCleaning
        fields = '__all__'


class SignBuildingAccidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignBuildingAccident
        fields = '__all__'


class WallMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = WallMaterial
        fields = '__all__'


class ProjectSeriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectSeries
        fields = '__all__'


class ObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Object
        fields = '__all__'


class ProblemTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProblemType
        fields = '__all__'


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = '__all__'


class PredictSerializer(serializers.ModelSerializer):
    class Meta:
        model = Predict
        fields = '__all__'


class TaskInWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskInWork
        fields = '__all__'
        depth = 5


class TypeOfWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeOfWork
        fields = '__all__'
