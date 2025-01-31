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
