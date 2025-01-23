from tortoise import fields
from tortoise.manager import Manager
from tortoise.models import Model
from tortoise.queryset import QuerySet


class Language(Model):
    """Model for languages."""

    code = fields.CharField(max_length=4, unique=True)
    name = fields.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.code


class Currency(Model):
    """Model for currencies."""

    code = fields.CharField(pk=True, max_length=3, unique=True)
    code_numeric = fields.CharField(max_length=3, unique=True)
    name = fields.CharField(max_length=50, unique=True)
    symbol = fields.CharField(max_length=5, null=True)
    minor_unit = fields.IntField()

    def __str__(self):
        return self.code


class Continent(Model):
    """Model for continents."""

    code = fields.CharField(pk=True, max_length=2, unique=True)
    name = fields.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Country(Model):
    """Model for countries."""

    code_iso2 = fields.CharField(pk=True, max_length=2, unique=True)
    code_iso3 = fields.CharField(max_length=3, unique=True)
    onu_code = fields.CharField(max_length=3, unique=True)
    name = fields.CharField(max_length=100, unique=True)

    language_official = fields.ForeignKeyField("models.Language", related_name="official_language")
    language_others = fields.ManyToManyField("models.Language", related_name="other_languages")
    currency = fields.ForeignKeyField("models.Currency", related_name="currency")
    continent = fields.ForeignKeyField("models.Continent", related_name="continent")

    def __str__(self):
        return self.name


class AdministrativeLevelOne(Model):
    """Model for administrative level one."""

    name = fields.CharField(max_length=50, unique=True)
    country_label = fields.CharField(max_length=50, unique=True)

    country = fields.ForeignKeyField("models.Country", related_name="administrative_level_one_country")

    def __str__(self):
        return self.name


class AdministrativeLevelTwo(Model):
    """Model for administrative level two."""

    name = fields.CharField(max_length=50, unique=True)
    country_label = fields.CharField(max_length=50, unique=True)

    administrative_level_one = fields.ForeignKeyField("models.AdministrativeLevelOne", related_name="administrative_level_two_administrative_level_one")

    def __str__(self):
        return self.name


class City(Model):
    """Model for cities."""

    name = fields.CharField(max_length=50, unique=True)

    administrative_level_one = fields.ForeignKeyField("models.AdministrativeLevelOne", related_name="administrative_level_one")
    administrative_level_two = fields.ForeignKeyField("models.AdministrativeLevelTwo", related_name="administrative_level_two")

    def __str__(self):
        return self.name
