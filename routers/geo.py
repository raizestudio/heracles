from fastapi import APIRouter

from models.geo import (
    CallingCode,
    Continent,
    Country,
    Currency,
    Language,
    PhoneNumber,
    TopLevelDomain,
)
from schemas.geo import (
    CallingCodeCreate,
    ContinentCreate,
    CountryCreate,
    CurrencyCreate,
    LanguageCreate,
    PhoneNumberCreate,
    TopLevelDomainCreate,
)

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


@router.get("/calling-codes")
async def get_calling_codes():
    _calling_codes = await CallingCode.all()
    return _calling_codes


@router.get("/calling-codes/{calling_code}")
async def get_calling_code(calling_code: str):
    _calling_code = await CallingCode.get(code=calling_code)
    return _calling_code


@router.post("/calling-codes")
async def create_calling_code(calling_code: CallingCodeCreate):
    _country = await Country.get(code_iso2=calling_code.country)
    _calling_code = await CallingCode.create(code=calling_code.code, country=_country)
    return _calling_code


@router.get("/phone-numbers")
async def get_phone_numbers():
    _phone_numbers = await PhoneNumber.all()
    return _phone_numbers


@router.get("/phone-numbers/{phone_number}")
async def get_phone_number(phone_number: str):
    _phone_number = await PhoneNumber.get(phone_number=phone_number)
    return _phone_number


@router.post("/phone-numbers")
async def create_phone_number(phone_number: PhoneNumberCreate):
    _calling_code = await CallingCode.get(code=phone_number.calling_code)
    _phone_number = await PhoneNumber.create(phone_number=phone_number.phone_number, calling_code=_calling_code)
    return _phone_number


@router.get("/top-level-domains")
async def get_top_level_domains():
    _top_level_domains = await TopLevelDomain.all()
    return _top_level_domains


@router.get("/top-level-domains/{top_level_domain}")
async def get_top_level_domain(top_level_domain: str):
    _top_level_domain = await TopLevelDomain.get(code=top_level_domain)
    return _top_level_domain


@router.post("/top-level-domains")
async def create_top_level_domain(top_level_domain: TopLevelDomainCreate):
    _country = await Country.get(code_iso2=top_level_domain.country)
    _top_level_domain = await TopLevelDomain.create(
        code=top_level_domain.code,
        operator=top_level_domain.operator,
        idn=top_level_domain.idn,
        dnssec=top_level_domain.dnssec,
        sld=top_level_domain.sld,
        ipv6=top_level_domain.ipv6,
        country=_country,
    )
    return _top_level_domain


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
