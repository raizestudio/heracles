from enum import Enum

from tortoise import fields
from tortoise.manager import Manager
from tortoise.models import Model
from tortoise.queryset import QuerySet


class ServiceRequestStatusEnum(Enum):
    """Enum for service request status."""

    ACTIVE = "active"
    INACTIVE = "inactive"
    DRAFT = "draft"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class ServiceType(Model):
    """Model for service types."""

    code = fields.CharField(pk=True, max_length=50, unique=True)
    name = fields.CharField(max_length=255)

    def __str__(self):
        return self.name


class ServiceManager(Manager):
    """Manager for Service model."""


class ServiceQuerySet(QuerySet):
    """QuerySet for Service model."""


class Service(Model):
    """Model for services."""

    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=50, unique=True)
    description = fields.TextField(null=True)
    is_active = fields.BooleanField(default=True)

    service_type = fields.ForeignKeyField("models.ServiceType", related_name="service_types")
    available_assets = fields.ManyToManyField("models.Asset", related_name="service_assets")

    def __str__(self):
        return self.name


class ServiceRequestEntity(Model):
    """Model for service request entities."""

    id = fields.IntField(pk=True)

    service = fields.ForeignKeyField("models.Service", related_name="service_request_entities")
    asset = fields.ForeignKeyField("models.Asset", related_name="service_request_entities")
    operator = fields.ForeignKeyField("models.Operator", related_name="service_request_entities")

    def __str__(self):
        return self.id


class ServiceRequest(Model):
    """Model for service requests."""

    id = fields.UUIDField(pk=True)
    status = fields.CharEnumField(ServiceRequestStatusEnum, default=ServiceRequestStatusEnum.DRAFT)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    service_request_entities = fields.ManyToManyField("models.ServiceRequestEntity", related_name="service_request_entities")

    def __str__(self):
        return self.id
