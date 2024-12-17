from tortoise import fields
from tortoise.manager import Manager
from tortoise.models import Model
from tortoise.queryset import QuerySet


class UserManager(Manager):
    """Manager for User model."""


class UserQuerySet(QuerySet):
    """QuerySet for User model."""

    def active(self):
        """Filter users that are active."""
        return self.filter(is_active=True)

    def inactive(self):
        """Filter users that are inactive."""
        return self.filter(is_active=False)


class User(Model):
    """Model for users."""

    id = fields.IntField(pk=True)
    username = fields.CharField(max_length=50, unique=True)
    password = fields.CharField(max_length=128)
    # password2 = fields.CharField(max_length=128)
    email = fields.CharField(max_length=100, unique=True)
    first_name = fields.CharField(max_length=50)
    last_name = fields.CharField(max_length=50)
    is_active = fields.BooleanField(default=True)
    avatar = fields.CharField(max_length=255, null=True)

    def __str__(self):
        return self.username
