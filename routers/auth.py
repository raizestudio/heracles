import logging
from typing import Annotated

import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordRequestForm
from tortoise.exceptions import DoesNotExist

from models.auth import ApiKey, Session, Token
from models.clients import Client
from models.users import User
from schemas.auth import (
    AuthenticationSchema,
    AuthenticationTokenSchema,
    SessionCreateSchema,
)
from schemas.users import UserCreate, UserRead
from utils.crypt import check_password, generate_token, hash_password

logger = logging.getLogger("auth")
router = APIRouter()


@router.post(
    "/register",
    responses={
        status.HTTP_404_NOT_FOUND: {"description": "User not found"},
        status.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized"},
    },
)
async def register_user(user: UserCreate):
    encrypted_password = hash_password(user.password)
    _, created = await User.get_or_create(
        username=user.username,
        password=encrypted_password,
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
    )
    if not created:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email or username already exists",
        )

    return {"message": "User created successfully", "user": created}


@router.post("/authenticate")
async def authenticate_user(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    _user = await User.get(email=form_data.username).prefetch_related("email")
    if not _user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    if not check_password(form_data.password, _user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

    print(f"User: {_user}")
    print(f"Mail: {_user.email}")
    token = generate_token({"email": str(_user.email)})

    return await Token(token=token, user=_user)


@router.post("/authenticate/token")
async def authenticate_token_user(authentication: AuthenticationTokenSchema):
    _token = await Token.get(token=authentication.token).prefetch_related("user")
    user_data = UserRead.model_validate(_token.user)

    if not _token:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Token match not found")

    return {
        "message": "User authenticated successfully",
        "user": user_data,
        "token": _token.token,
    }


@router.post("/session", responses={status.HTTP_400_BAD_REQUEST: {"description": "Bad Request"}})
async def create_session(session: SessionCreateSchema):
    """
    Detect if there's already a session for a given connection.
    If there's no session, create one.

    Args:
        session (SessionCreateSchema): Session data

    Returns:
        dict: Session data
    """
    print(session)
    if not session.ip_v4 and not session.ip_v6:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="IP address is required")

    _session = None
    created = False

    if session.ip_v4:
        try:
            _session = await Session.get(ip_v4=session.ip_v4)
        except DoesNotExist:
            _session = await Session.create(ip_v4=session.ip_v4)
            created = True

    if session.ip_v6:
        try:
            print("Getting session")
            _session = await Session.get(ip_v6=session.ip_v6)
        except DoesNotExist:
            print("Creating session")
            _session = await Session.create(ip_v6=session.ip_v6)
            created = True

    if _session is None:
        _session = await Session.create(ip_v4=session.ip_v4, ip_v6=session.ip_v6)
        created = True

    return {"session": _session, "created": created}


@router.get("/api-key")
async def create_api_key():
    """
    Create an API key for the client.

    Returns:
        dict: API key data
    """
    print("Creating API key")
    _client = await Client.create(name="aa")
    token = generate_token({"client_id": str(_client.id)})
    _api_key = await ApiKey.create(key=token, client=_client)
    return {"api_key": _api_key.key}
