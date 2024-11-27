from tortoise import fields
from tortoise.manager import Manager
from tortoise.models import Model
from tortoise.queryset import QuerySet


class ServiceManager(Manager):
    """Manager for Service model."""


class ServiceQuerySet(QuerySet):
    """QuerySet for Service model."""


class Service(Model):
    """Model for services."""

    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=50, unique=True)
    description = fields.TextField()
    is_active = fields.BooleanField(default=True)

    def __str__(self):
        return self.name
