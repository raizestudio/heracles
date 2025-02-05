import logging
from typing import Annotated

from fastapi import APIRouter, Depends, Request, Security
from fastapi.responses import JSONResponse

from config import Settings
from models.clients import Client
from models.users import User
from utils.permissions import get_current_user_or_client

settings = Settings()
router = APIRouter()

logger = logging.getLogger("uvicorn")


@router.get("/health")
async def health():
    response = {"status": "ok"}

    return response


@router.get("/info")
async def info(request: Request, current_user_or_client: Annotated[User | Client, Depends(get_current_user_or_client)]):
    response = {
        "name": settings.app_name,
        "version": settings.app_version,
        "version_api": settings.app_api_version,
    }
    if isinstance(current_user_or_client, User):
        logger.warning(f"User {str(current_user_or_client.id)} accessed the {request.url} endpoint")
        response.update({"user": str(current_user_or_client.id)})

    elif isinstance(current_user_or_client, Client):
        logger.warning(f"Client {str(current_user_or_client.id)} accessed the {request.url} endpoint")
        response.update({"client": str(current_user_or_client.id)})

    return JSONResponse(content=response)
