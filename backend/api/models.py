from datetime import datetime, timedelta

from django.contrib.auth.models import User
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser

from django.db import models


class MCDCategory(models.Model):
    local_id = models.IntegerField()
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class MCDManagementStatus(models.Model):
    local_id = models.IntegerField()
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class MCDStatus(models.Model):
    local_id = models.IntegerField()
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class TypeHousingStock(models.Model):
    local_id = models.IntegerField()
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class TypeSocialObject(models.Model):
    local_id = models.IntegerField()
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class RoofMaterial(models.Model):
    local_id = models.IntegerField()
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class OrderRoofCleaning(models.Model):
    local_id = models.IntegerField()
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class SignBuildingAccident(models.Model):
    local_id = models.IntegerField()
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class WallMaterial(models.Model):
    local_id = models.IntegerField()
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class ProjectSeries(models.Model):
    local_id = models.IntegerField()
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Object(models.Model):
    local_id = models.IntegerField()
    name = models.CharField(max_length=255)
    adm_area = models.CharField("Административный округ", max_length=255)
    district = models.CharField("Район", max_length=255)
    street = models.CharField("Улица", max_length=255)
    house = models.CharField("Дом", max_length=255)
    flat = models.CharField("Квартира", max_length=255)
    corpus = models.CharField("Корпус", max_length=255)
    parent_id = models.IntegerField(null=True)
    login = models.CharField(max_length=255)
    col_754 = models.CharField("Назначение", max_length=255, null=True)
    col_755 = models.CharField("Форма собственности", max_length=255, null=True)
    col_756 = models.IntegerField("Год постройки")
    col_757 = models.IntegerField("Год реконструкции", null=True)
    col_758 = models.ForeignKey(ProjectSeries, on_delete=models.CASCADE, verbose_name="Серия проекта")
    col_759 = models.IntegerField("Количество этажей")
    col_760 = models.IntegerField("Количество подъездов")
    col_761 = models.IntegerField("Количество квартир")
    col_762 = models.IntegerField("Общая площадь")
    col_763 = models.IntegerField("Общая площадь жилых помещений")
    col_764 = models.IntegerField("Общая площадь нежилых помещений")
    col_765 = models.IntegerField("Строительный объем", null=True)
    col_766 = models.IntegerField("Износ объекта (по БТИ)", null=True)
    col_767 = models.CharField("Класс энергоэффективности", max_length=255, null=True)
    col_769 = models.ForeignKey(WallMaterial, on_delete=models.CASCADE, verbose_name="Материал стен")
    col_770 = models.ForeignKey(SignBuildingAccident, on_delete=models.CASCADE, verbose_name="Признак аварийности здания")
    col_771 = models.IntegerField("Количество пассажирских лифтов")
    col_772 = models.IntegerField("Количество грузопассажирских лифтов")
    col_775 = models.ForeignKey(OrderRoofCleaning, on_delete=models.CASCADE, verbose_name="Очередность уборки кровли", null=True)
    col_781 = models.ForeignKey(RoofMaterial, on_delete=models.CASCADE, verbose_name="Материал кровли")
    col_782 = models.IntegerField("UNOM")
    col_2156 = models.ForeignKey(TypeSocialObject, on_delete=models.CASCADE, verbose_name="Вид социального объекта", null=True)
    col_2463 = models.ForeignKey(TypeHousingStock, on_delete=models.CASCADE, verbose_name="Тип жилищного фонда")
    col_3163 = models.ForeignKey(MCDStatus, on_delete=models.CASCADE, verbose_name="Статус МКД")
    col_3243 = models.ForeignKey(MCDManagementStatus, on_delete=models.CASCADE, verbose_name="Статус управления МКД", null=True)
    col_3363 = models.IntegerField("Количество грузовых лифтов")
    col_3468 = models.CharField("Причина Изменения Статуса МКД", max_length=255, null=True)
    col_103506 = models.ForeignKey(MCDCategory, on_delete=models.CASCADE, verbose_name="Категория МКД", null=True)

    def __str__(self):
        return self.name


class ProblemType(models.Model):
    local_id = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    system = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Problem(models.Model):
    problem_type = models.ForeignKey(ProblemType, on_delete=models.CASCADE)
    source = models.CharField("Источник", max_length=255)
    date_create = models.DateTimeField("Дата создания во внешней системе")
    date_close = models.DateTimeField("Дата закрытия")
    object = models.ForeignKey(Object, on_delete=models.CASCADE)
    date_end = models.DateTimeField("Дата и время завершения события во")

    def __str__(self):
        return f"{self.problem_type.name} {self.object.name}"


class Predict(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    planing_date = models.DateTimeField()

    def __str__(self):
        return f"{self.problem.name} {self.planing_date}"


class TaskInWork(models.Model):

    class Status(models.TextChoices):
        CREATED = 'CR', _('CREATED')
        ASSIGNED = 'AS', _('ASSIGNED')
        PLANNED = 'PL', _('PLANNED')
        IN_PROGRESS = 'IN', _('IN_PROGRESS')
        READY = 'RE', _('READY')

    global_id = models.IntegerField("Уникальный идентификатор работы на объекте (в таблице)")
    period = models.IntegerField("Период работы")
    work_name = models.CharField("Наименование работы", max_length=255)
    num_entrance = models.IntegerField("Подъезд", null=True)
    elevator_number = models.IntegerField("Номер лифта", null=True)
    plan_date_start = models.DateField("Плановая дата начала работы")
    plan_date_end = models.DateField("Плановая дата окончания работы")
    fact_date_start = models.DateField("Фактическая дата начала работы")
    fact_date_end = models.DateField("Фактическая дата окончания работы")

    status = models.CharField(
        max_length=2,
        choices=Status.choices,
        default=Status.CREATED,
    )

    object = models.ForeignKey(Object, on_delete=models.CASCADE)

    def __str__(self):
        return


class TypeOfWork(models.Model):

    class TypeOfWork(models.TextChoices):
        SERVICE = 'SERV', _('SERVICE')
        WORK = 'WORK', _('WORK')

    code = models.IntegerField("Код")
    name = models.CharField("Наименование", max_length=255)
    name_object = models.CharField("Наименование объекта общего имущества", max_length=255)

    type_of_work = models.CharField(
        max_length=4,
        choices=TypeOfWork.choices,
        default=TypeOfWork.WORK,
    )
    group_of_work = models.CharField("Группа работ", max_length=255)
    abbreviated_name_of_work = models.CharField("Сокращенное наименование работы", max_length=255)

    def __str__(self):
        return self.name
