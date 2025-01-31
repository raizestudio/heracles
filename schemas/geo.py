from pydantic import BaseModel, Field


class LanguageCreate(BaseModel):
    """Schema for creating a language."""

    code: str = Field(..., description="Code of the language.")
    name: str = Field(..., description="Name of the language.")


class CurrencyCreate(BaseModel):
    """Schema for creating a currency."""

    code: str = Field(..., description="Code of the currency.")
    code_numeric: int = Field(..., description="Numeric code of the currency.")
    name: str = Field(..., description="Name of the currency.")
    symbol: str = Field(..., description="Symbol of the currency.")
    minor_unit: int = Field(..., description="Minor unit of the currency.")


class CallingCodeCreate(BaseModel):
    """Schema for creating a calling code."""

    code: str = Field(..., description="Code of the calling code.")

    country: str = Field(..., description="Country of the calling code.")


class PhoneNumberCreate(BaseModel):
    """Schema for creating a phone number."""

    phone_number: str = Field(..., description="Phone number.")

    calling_code: str = Field(..., description="Calling code of the phone number.")


class TopLevelDomainCreate(BaseModel):
    """Schema for creating a top level domain."""

    code: str = Field(..., description="Code of the top level domain.")
    operator: str = Field(None, description="Operator of the top level domain.")
    idn: bool = Field(False, description="IDN of the top level domain.")
    dnssec: bool = Field(False, description="DNSSEC of the top level domain.")
    sld: bool = Field(False, description="SLD of the top level domain.")
    ipv6: bool = Field(False, description="IPv6 of the top level domain.")

    country: str = Field(..., description="Country of the top level domain.")


class ContinentCreate(BaseModel):
    """Schema for creating a continent."""

    code: str = Field(..., description="Code of the continent.")
    name: str = Field(..., description="Name of the continent.")


class CountryCreate(BaseModel):
    """Schema for creating a country."""

    code_iso2: str = Field(..., description="Code iso 2 of the country.")
    code_iso3: str = Field(..., description="Code iso 3 of the country.")
    onu_code: int = Field(..., description="ONU code of the country.")
    name: str = Field(..., description="Name of the country.")

    language_official: str = Field(..., description="Official language of the country.")
    continent: str = Field(..., description="Continent of the country.")
    currency: str = Field(..., description="Currency of the country.")


class AdministrativeLevelOneCreate(BaseModel):
    """Schema for creating an administrative level one."""

    code: str = Field(..., description="Code of the administrative level one.")
    name: str = Field(..., description="Name of the administrative level one.")

    country: str = Field(..., description="Country of the administrative level one.")


class AdministrativeLevelTwoCreate(BaseModel):
    """Schema for creating an administrative level two."""

    code: str = Field(..., description="Code of the administrative level two.")
    numeric_code: int = Field(
        ..., description="Numeric code of the administrative level two."
    )
    name: str = Field(..., description="Name of the administrative level two.")

    administrative_level_one: str = Field(
        ..., description="Administrative level one of the administrative level two."
    )


class CityTypeCreate(BaseModel):
    """Schema for creating a city type."""

    code: str = Field(..., description="Code of the city type.")
    name: str = Field(..., description="Name of the city type.")
    description: str = Field(None, description="Description of the city type.")
    population_min: int = Field(
        None, description="Minimum population of the city type."
    )
    population_max: int = Field(
        None, description="Maximum population of the city type."
    )


class CityCreate(BaseModel):
    """Schema for creating a city"""

    name: str = Field(..., description="Name of the city.")
    postal_code: str = Field(..., description="Postal code of the city.")
    insee_code: str = Field(None, description="INSEE code of the city.")

    city_type: str = Field(..., description="Type of the city.")
    administrative_level_one: str = Field(
        ..., description="Administrative level one of the city."
    )
    administrative_level_two: str = Field(
        ..., description="Administrative level two of the city."
    )


class StreetTypeCreate(BaseModel):
    """Schema for creating a street type."""

    code: str = Field(..., description="Code of the street type.")
    name: str = Field(..., description="Name of the street type.")
    short_name: str = Field(None, description="Short name of the street type.")


class StreetCreate(BaseModel):
    """Schema for creating a street."""

    name: str = Field(..., description="Name of the street.")

    street_type: str = Field(..., description="Type of the street.")
    city: str = Field(..., description="City of the street.")


class AddressCreate(BaseModel):
    """Schema for creating an address."""

    number: str = Field(..., description="Number of the address.")
    number_extension: str = Field(None, description="Number extension of the address.")
    complement: str = Field(None, description="Complement of the address.")
    latitude: str = Field(None, description="Latitude of the address.")
    longitude: str = Field(None, description="Longitude of the address.")

    street: str = Field(..., description="Street of the address.")
