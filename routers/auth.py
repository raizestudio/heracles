import jwt
from fastapi import APIRouter, HTTPException, status
from fastapi.encoders import jsonable_encoder
from tortoise.exceptions import DoesNotExist

from models.auth import Session, Token
from models.users import User
from schemas.auth import (
    AuthenticationSchema,
    AuthenticationTokenSchema,
    SessionCreateSchema,
)
from schemas.users import UserCreate, UserRead
from utils.crypt import check_password, generate_token, hash_password

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
async def authenticate_user(authentication: AuthenticationSchema):
    _user = await User.get(email=authentication.email)
    token = generate_token(_user.email)
    _token = await Token.create(token=token, user=_user)
    if not _user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    if not check_password(authentication.password, _user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

    return {"message": "User authenticated successfully", "user": _user, "token": token}


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

