from tortoise import fields
from tortoise.manager import Manager
from tortoise.models import Model
from tortoise.queryset import QuerySet


class Agency(Model):
    """Model for agencies."""

    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100, unique=True)
    address = fields.CharField(max_length=255)
    email = fields.CharField(max_length=100, unique=True)
    website = fields.CharField(max_length=255, null=True)
    logo = fields.CharField(max_length=255, null=True)
    is_active = fields.BooleanField(default=True)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    phone_number = fields.ForeignKeyField("models.PhoneNumber", related_name="agency_phone_numbers", null=True)
    assets = fields.ManyToManyField("models.Asset", related_name="agency_assets")
    service_requests = fields.ManyToManyField("models.ServiceRequest", related_name="agency_service_requests")

    def __str__(self):
        return self.name
