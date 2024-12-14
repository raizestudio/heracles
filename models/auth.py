from tortoise import fields
from tortoise.manager import Manager
from tortoise.models import Model
from tortoise.queryset import QuerySet


class TokenManager(Manager):
    """Manager for Token model."""


class TokenQuerySet(QuerySet):
    """QuerySet for Token model."""


class Token(Model):
    """Model for tokens."""

    token = fields.CharField(max_length=255, pk=True)
    user = fields.ForeignKeyField("models.User", related_name="tokens")
    created_at = fields.DatetimeField(auto_now_add=True)

    def __str__(self):
        return self.token
