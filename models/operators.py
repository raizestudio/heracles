from tortoise import fields
from tortoise.models import Model


class Operator(Model):
    """Model for operators."""

    id = fields.IntField(pk=True)
    score = fields.IntField()
    evaluation = fields.FloatField()
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    user = fields.ForeignKeyField("models.User", related_name="operator_user")
    phone_number = fields.ForeignKeyField(
        "models.PhoneNumber", related_name="operator_phone_numbers", null=True
    )

    def __str__(self):
        return self.name
