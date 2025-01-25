from enum import IntEnum

from tortoise import fields
from tortoise.manager import Manager
from tortoise.models import Model
from tortoise.queryset import QuerySet


class AdministrativeLevelsEnum(IntEnum):
    ZERO = 0
    ONE = 1
    TWO = 2


class Language(Model):
    """Model for languages."""

    code = fields.CharField(pk=True, max_length=4, unique=True)
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


class CountryData(Model):
    """Model for country data."""

    population = fields.IntField(null=True)
    area = fields.FloatField(null=True)
    population_density = fields.FloatField(null=True)
    gdp = fields.FloatField(null=True)
    gdp_per_capita = fields.FloatField(null=True)
    inflation = fields.FloatField(null=True)
    human_development_index = fields.FloatField(null=True)
    administrative_levels = fields.IntEnumField(enum_type=AdministrativeLevelsEnum, default=AdministrativeLevelsEnum.ZERO)
    administrative_level_one_label = fields.CharField(max_length=64, null=True)
    administrative_level_two_label = fields.CharField(max_length=64, null=True)

    country = fields.OneToOneField("models.Country", related_name="country_data_country")

    def calculate_population_density(self):
        if self.area and self.population:
            return self.population / self.area
        return None

    def calculate_gdp_per_capita(self):
        if self.gdp and self.population:
            return self.gdp / self.population
        return None

    def __str__(self):
        return self.country.name


class AdministrativeLevelOne(Model):
    """Model for administrative level one."""

    name = fields.CharField(max_length=50, unique=True)

    country = fields.ForeignKeyField("models.Country", related_name="administrative_level_one_country")

    def __str__(self):
        return self.name


class AdministrativeLevelTwo(Model):
    """Model for administrative level two."""

    name = fields.CharField(max_length=50, unique=True)

    administrative_level_one = fields.ForeignKeyField("models.AdministrativeLevelOne", related_name="administrative_level_two_administrative_level_one")

    def __str__(self):
        return self.name


class CityType(Model):
    """Model for city types."""

    code = fields.CharField(max_length=10)
    name = fields.CharField(max_length=32)
    description = fields.TextField(null=True)
    population_min = fields.IntField(null=True)
    population_max = fields.IntField(null=True)

    def __str__(self):
        return self.code


class City(Model):
    """Model for cities."""

    name = fields.CharField(max_length=50, unique=True)

    city_type = fields.ForeignKeyField("models.CityType", related_name="city_type")
    administrative_level_one = fields.ForeignKeyField("models.AdministrativeLevelOne", related_name="administrative_level_one")
    administrative_level_two = fields.ForeignKeyField("models.AdministrativeLevelTwo", related_name="administrative_level_two")

    def __str__(self):
        return self.name


class StreetType(Model):

    code = fields.CharField(pk=True, max_length=10, unique=True)
    name = fields.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Street(Model):
    """Model for streets."""

    name = fields.CharField(max_length=50, unique=True)

    city = fields.ForeignKeyField("models.City", related_name="city")

    def __str__(self):
        return self.name
