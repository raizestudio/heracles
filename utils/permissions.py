from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt import InvalidTokenError
from tortoise.exceptions import DoesNotExist

from models.users import User
from utils.crypt import decode_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_token(token)
        if not payload:
            raise credentials_exception
        print(f"Payload: {payload}")
        _user = await User.get(email=payload["email"])

        return _user

    except InvalidTokenError:
        raise credentials_exception


def is_admin(user: dict = Depends(get_current_user)):
    """Check if user is an admin."""
    if user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to perform this action.",
        )
    return True
