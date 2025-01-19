from tortoise import fields
from tortoise.manager import Manager
from tortoise.models import Model
from tortoise.queryset import QuerySet


class Menu(Model):
    """Model for menus"""

    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=255)
    parent = fields.IntField(null=True)

    def __str__(self):
        return self.name
