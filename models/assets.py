from tortoise import fields
from tortoise.manager import Manager
from tortoise.models import Model
from tortoise.queryset import QuerySet


class AssetManager(Manager):
    """Manager for Asset model."""


class AssetQuerySet(QuerySet):
    """QuerySet for Asset model."""


class Asset(Model):
    """Model for assets."""

    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=50, unique=True)
    description = fields.TextField()
    is_active = fields.BooleanField(default=True)

    def __str__(self):
        return self.name
