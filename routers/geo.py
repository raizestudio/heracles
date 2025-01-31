from fastapi import APIRouter

from models.geo import Continent, Country, Currency, Language
from schemas.geo import ContinentCreate, CountryCreate, CurrencyCreate, LanguageCreate

router = APIRouter()


@router.get("/languages")
async def get_languages():
    _languages = await Language.all()
    return _languages


@router.get("/languages/{language}")
async def get_language(language: str):
    _language = await Language.get(code=language)
    return _language


@router.post("/languages")
async def create_language(language: LanguageCreate):
    _language = await Language.create(code=language.code, name=language.name)
    return _language


@router.get("/currencies")
async def get_currencies():
    _currencies = await Currency.all()
    return _currencies


@router.get("/currencies/{currency}")
async def get_currency(currency: str):
    _currency = await Currency.get(code=currency)
    return _currency


@router.post("/currencies")
async def create_currency(currency: CurrencyCreate):
    _currency = await Currency.create(
        code=currency.code,
        code_numeric=currency.code_numeric,
        name=currency.name,
        symbol=currency.symbol,
        minor_unit=currency.minor_unit,
    )
    return _currency


@router.get("/continents")
async def get_continents():
    _continents = await Continent.all()
    return _continents


@router.post("/continents")
async def create_continent(continent: ContinentCreate):
    _continent = await Continent.create(code=continent.code, name=continent.name)
    return _continent


@router.get("/continents/{continent}")
async def get_continent(continent: str):
    _continent = await Continent.get(code=continent)
    return _continent


@router.get("/countries")
async def get_countries():
    _countries = await Country.all()
    return _countries


@router.get("/countries/{country}")
async def get_country(country: str):
    _country = await Country.get(code_iso2=country)
    return _country


@router.post("/countries")
async def create_country(country: CountryCreate):
    _continent = await Continent.get(code=country.continent)
    _language_official = await Language.get(code=country.language_official)
    _currency = await Currency.get(code=country.currency)
    _country = await Country.create(
        code_iso2=country.code_iso2,
        code_iso3=country.code_iso3,
        onu_code=country.onu_code,
        name=country.name,
        language_official=_language_official,
        continent=_continent,
        currency=_currency,
    )
    return _country
