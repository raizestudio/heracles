import jwt
from fastapi import APIRouter, HTTPException, status

from models.users import User
from schemas.auth import AuthenticaSchema
from schemas.users import UserCreate, UserRead
from utils.crypt import check_password, hash_password

router = APIRouter()


@router.post(
    "/register",
    responses={
        status.HTTP_404_NOT_FOUND: {"description": "User not found"},
        status.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized"},
    },
)
async def regiser_user(user: UserCreate):
    encrypted_password = hash_password(user.password)
    _, created = await User.get_or_create(username=user.username, password=encrypted_password, email=user.email, first_name=user.first_name, last_name=user.last_name)
    if not created:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User with this email or username already exists")

    return {"message": "User created successfully", "user": created}


@router.post("/authenticate")
async def authenticate_user(authentication: AuthenticaSchema):
    _user = await User.get(email=authentication.email)
    token = jwt.encode({"email": _user.email}, "secret", algorithm="HS256")
    if not _user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    if not check_password(authentication.password, _user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

    return {"message": "User authenticated successfully", "user": _user, "token": token}
