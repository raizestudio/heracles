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
