from rest_framework import serializers

from .models import (ObjectType,
                     Object,
                     ProblemType,
                     Problem,
                     Predict,
                     Executor,
                     TaskInWork)


class ObjectTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObjectType
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


class ExecutorTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Executor
        fields = '__all__'


class TaskInWorkSerializer(serializers.ModelSerializer):
    predict = serializers.SerializerMethodField()

    class Meta:
        model = TaskInWork
        fields = '__all__'
        depth = 5

    def get_predict(self, obj):
        selected_predict = Predict.objects.filter(
            problem=obj.problem).distinct()
        return PredictSerializer(selected_predict, many=True).data
