from tortoise import fields
from tortoise.models import Model


class Tax(Model):
    """Model for taxes."""

    id = fields.IntField(pk=True)
    rate = fields.FloatField()
    description = fields.TextField()

    country = fields.ForeignKeyField("models.Country", related_name="tax_country")

    def __str__(self):
        return self.name


class Order(Model):
    """Model for orders."""

    id = fields.UUIDField(pk=True)
    total_amount = fields.FloatField()
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    tax = fields.ForeignKeyField("models.Tax", related_name="order_tax")
    service_request = fields.ForeignKeyField("models.ServiceRequest", related_name="order_service_request")

    def __str__(self):
        return super().__str__()
