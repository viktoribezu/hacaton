from datetime import datetime, timedelta

from django.conf import settings
from django.utils.translation import gettext_lazy as _
from authemail.models import EmailUserManager, EmailAbstractUser

from django.db import models


class Users(EmailAbstractUser):
    objects = EmailUserManager()


class BaseModel(models.Model):
    is_archive = models.BooleanField(default=False)

    class Meta:
        abstract = True


class MCDCategory(BaseModel):
    local_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class MCDManagementStatus(BaseModel):
    local_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class MCDStatus(BaseModel):
    local_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class TypeHousingStock(BaseModel):
    local_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class TypeSocialObject(BaseModel):
    local_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class RoofMaterial(BaseModel):
    local_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class OrderRoofCleaning(BaseModel):
    local_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class SignBuildingAccident(BaseModel):
    local_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class WallMaterial(BaseModel):
    local_id = models.BigIntegerField(unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class ProjectSeries(BaseModel):
    local_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Object(BaseModel):
    local_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    adm_area = models.CharField("Административный округ", max_length=255, null=True)
    district = models.CharField("Район", max_length=255, null=True)
    street = models.CharField("Улица", max_length=255)
    house = models.CharField("Дом", max_length=255, null=True)
    corpus = models.CharField("Корпус", max_length=255, null=True)
    composition = models.CharField("Строение", max_length=255, null=True)
    structure = models.CharField("Сооружение", max_length=255, null=True)
    parent_id = models.CharField(max_length=255, null=True)
    login = models.CharField(max_length=255)
    col_754 = models.CharField("Назначение", max_length=255, null=True)
    col_755 = models.CharField("Форма собственности", max_length=255, null=True)
    col_756 = models.IntegerField("Год постройки", null=True)
    col_757 = models.IntegerField("Год реконструкции", null=True)
    col_758 = models.ForeignKey(ProjectSeries, on_delete=models.CASCADE, verbose_name="Серия проекта", to_field='local_id', null=True)
    col_759 = models.IntegerField("Количество этажей", null=True)
    col_760 = models.IntegerField("Количество подъездов", null=True)
    col_761 = models.IntegerField("Количество квартир", null=True)
    col_762 = models.FloatField("Общая площадь", null=True)
    col_763 = models.FloatField("Общая площадь жилых помещений", null=True)
    col_764 = models.FloatField("Общая площадь нежилых помещений", null=True)
    col_765 = models.IntegerField("Строительный объем", null=True)
    col_766 = models.IntegerField("Износ объекта (по БТИ)", null=True)
    col_767 = models.CharField("Класс энергоэффективности", max_length=255, null=True)
    col_769 = models.ForeignKey(WallMaterial, on_delete=models.CASCADE, verbose_name="Материал стен", to_field='local_id', null=True)
    col_770 = models.ForeignKey(SignBuildingAccident, on_delete=models.CASCADE, verbose_name="Признак аварийности здания", to_field='local_id', null=True)
    col_771 = models.IntegerField("Количество пассажирских лифтов", null=True)
    col_772 = models.IntegerField("Количество грузопассажирских лифтов", null=True)
    col_775 = models.ForeignKey(OrderRoofCleaning, on_delete=models.CASCADE, verbose_name="Очередность уборки кровли", to_field='local_id', null=True)
    col_781 = models.ForeignKey(RoofMaterial, on_delete=models.CASCADE, verbose_name="Материал кровли", to_field='local_id', null=True)
    col_782 = models.IntegerField("UNOM", unique=True)
    col_2156 = models.ForeignKey(TypeSocialObject, on_delete=models.CASCADE, verbose_name="Вид социального объекта", to_field='local_id', null=True)
    col_2463 = models.ForeignKey(TypeHousingStock, on_delete=models.CASCADE, verbose_name="Тип жилищного фонда", to_field='local_id', null=True)
    col_3163 = models.ForeignKey(MCDStatus, on_delete=models.CASCADE, verbose_name="Статус МКД", to_field='local_id', null=True)
    col_3243 = models.ForeignKey(MCDManagementStatus, on_delete=models.CASCADE, verbose_name="Статус управления МКД", to_field='local_id', null=True)
    col_3363 = models.IntegerField("Количество грузовых лифтов", null=True)
    col_3468 = models.CharField("Причина Изменения Статуса МКД", max_length=255, null=True)
    col_103506 = models.ForeignKey(MCDCategory, on_delete=models.CASCADE, verbose_name="Категория МКД", to_field='local_id', null=True)

    def __str__(self):
        return self.name


class ProblemType(BaseModel):
    local_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    system = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Problem(BaseModel):
    problem_type = models.ForeignKey(ProblemType, on_delete=models.CASCADE, to_field='local_id')
    date_create = models.DateTimeField("Дата создания во внешней системе")
    date_close = models.DateTimeField("Дата закрытия", null=True)
    unom = models.IntegerField("UNOM")
    object = models.ForeignKey(Object, on_delete=models.CASCADE, null=True, to_field='col_782')
    date_end = models.DateTimeField("Дата и время завершения события во", null=True)

    def __str__(self):
        return f"{self.problem_type.name} {self.object.name}"


class Predict(models.Model):
    object = models.ForeignKey(Object, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    planing_date = models.DateTimeField()

    def __str__(self):
        return f"{self.object.name} {self.planing_date}"


class TypeOfWork(BaseModel):

    class TypeOfWork(models.TextChoices):
        SERVICE = 'SERV', _('SERVICE')
        WORK = 'WORK', _('WORK')

    local_id = models.CharField(max_length=255, unique=True)
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


class TaskInWork(BaseModel):

    global_id = models.IntegerField("Уникальный идентификатор работы на объекте (в таблице)")
    period = models.IntegerField("Период работы")
    type_of_work = models.ForeignKey(TypeOfWork, on_delete=models.CASCADE, to_field='local_id')
    num_entrance = models.IntegerField("Подъезд", null=True)
    elevator_number = models.CharField("Номер лифта", max_length=255, null=True)
    plan_date_start = models.DateField("Плановая дата начала работы")
    plan_date_end = models.DateField("Плановая дата окончания работы")
    fact_date_start = models.DateField("Фактическая дата начала работы")
    fact_date_end = models.DateField("Фактическая дата окончания работы")

    object = models.ForeignKey(Object, on_delete=models.CASCADE, to_field='col_782')
    unom = models.IntegerField("UNOM")

    def __str__(self):
        return
