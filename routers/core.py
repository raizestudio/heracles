import logging
from typing import Annotated

from fastapi import APIRouter, Depends

from models.users import User
from utils.permissions import get_current_user_or_client

router = APIRouter()

logger = logging.getLogger("uvicorn")


@router.get("/health")
async def health(current_user: Annotated[User, Depends(get_current_user_or_client)]):
    logger.warning(f"Root endpoint was accessed, using logger {logger.name}")
    return {"status": "ok", "cu": current_user}
