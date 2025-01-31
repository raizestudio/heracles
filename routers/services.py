from typing import List

from fastapi import APIRouter

from models.services import Service, ServiceRequest, ServiceType
from schemas.services import ServiceCreate, ServiceTypeCreate

router = APIRouter()


@router.get("/types")
async def get_service_types():
    _service_types = await ServiceType.all()
    return _service_types


@router.get("/types/{service_type}")
async def get_service_type(service_type: str):
    _service_type = await ServiceType.get(code=service_type)
    return _service_type


@router.post("/types")
async def create_service_type(service_type: ServiceTypeCreate):
    _service_type = await ServiceType.create(
        code=service_type.code, name=service_type.name
    )
    return _service_type


@router.get("/")
async def get_services():
    _services = await Service.all()
    return _services


@router.get("/{service}")
async def get_service(service: int):
    _service = await Service.get(id=service)
    return _service


@router.post("/")
async def create_service(service: ServiceCreate):
    _service_type = await ServiceType.get(code=service.service_type)
    _service = await Service.create(
        name=service.name, description=service.description, service_type=_service_type
    )
    return _service
