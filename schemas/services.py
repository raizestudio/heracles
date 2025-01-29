from typing import Optional

from pydantic import BaseModel


class ServiceTypeCreate(BaseModel):
    code: str
    name: str


class ServiceCreate(BaseModel):
    name: str
    description: Optional[str] = None

    service_type: str
