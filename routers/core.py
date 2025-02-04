from typing import Annotated

from fastapi import APIRouter, Depends

from models.users import User
from utils.permissions import get_current_user

router = APIRouter()


@router.get("/health")
async def health(current_user: Annotated[User, Depends(get_current_user)]):

    return {"status": "ok", "cu": current_user}
