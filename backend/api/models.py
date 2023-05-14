from datetime import datetime, timedelta

from django.conf import settings
from django.utils.translation import gettext_lazy as _
from authemail.models import EmailUserManager, EmailAbstractUser

from django.db import models


class Users(EmailAbstractUser):
    objects = EmailUserManager()


class ObjectType(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Object(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lng = models.DecimalField(max_digits=9, decimal_places=6)
    type = models.ForeignKey("ObjectType", on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class ProblemType(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Problem(models.Model):
    name = models.CharField(max_length=255)
    object = models.ForeignKey("Object", on_delete=models.CASCADE)
    type = models.ForeignKey("ProblemType", on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Predict(models.Model):
    problem = models.ForeignKey("Problem", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    planing_date = models.DateTimeField()

    def __str__(self):
        return f"{self.problem.name} {self.planing_date}"


class AppealCitizen(models.Model):

    class Criticality(models.TextChoices):
        CRITICAL = 'C', _('CRITICAL')
        MEDIUM_CRITICAL = 'MC', _('MEDIUM_CRITICAL')
        UNCRITICAL = 'UN', _('UNCRITICAL')

    created_at = models.DateTimeField(auto_now_add=True)
    problem = models.ForeignKey("Problem", on_delete=models.CASCADE)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)

    criticality = models.CharField(
        max_length=2,
        choices=Criticality.choices,
        default=Criticality.UNCRITICAL,
    )

    def __str__(self):
        return f"{self.problem.name} {self.created_at}"


class Executor(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class TaskInWork(models.Model):

    class Status(models.TextChoices):
        CREATED = 'CR', _('CREATED')
        ASSIGNED = 'AS', _('ASSIGNED')
        PLANNED = 'PL', _('PLANNED')
        IN_PROGRESS = 'IN', _('IN_PROGRESS')
        READY = 'RE', _('READY')

    start_fix = models.DateTimeField(null=True)
    date_fix_update_at = models.DateTimeField(null=True)
    finish_fix_at = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    status = models.CharField(
        max_length=2,
        choices=Status.choices,
        default=Status.CREATED,
    )
    status_update_at = models.DateTimeField()

    executor = models.ForeignKey("Executor", on_delete=models.CASCADE)
    problem = models.OneToOneField("Problem", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.status} {self.executor}"
