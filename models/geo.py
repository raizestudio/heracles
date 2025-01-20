from tortoise import fields
from tortoise.manager import Manager
from tortoise.models import Model
from tortoise.queryset import QuerySet


class Continent(Model):
    """Model for continents."""

    code = fields.CharField(max_length=2, unique=True)
    name = fields.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Country(Model):
    """Model for countries."""

    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=50, unique=True)

    continent = fields.ForeignKeyField("models.Continent", related_name="countries")

    def __str__(self):
        return self.name
