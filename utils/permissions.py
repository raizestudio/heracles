import logging
from typing import Annotated, List, Optional, Union

from fastapi import Depends, HTTPException, Security, status
from fastapi.security import APIKeyHeader, OAuth2PasswordBearer
from jwt import InvalidTokenError
from tortoise.exceptions import DoesNotExist

from models.auth import ApiKey
from models.users import User
from utils.crypt import decode_token

logger = logging.getLogger("auth")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)


async def get_current_client(api_key: Annotated[str, Depends(api_key_header)]):
    """
    Validate and return the API client using the API key.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_token(api_key)
        if not payload:
            logger.warning(f"Attempt to access with invalid API key: {api_key}")
            raise credentials_exception

        if "client_id" not in payload:
            logger.warning(f"Attempt to access with expired API key: {api_key}")
            raise credentials_exception

        _api_key = await ApiKey.get(key=api_key)

        return _api_key

    except DoesNotExist:
        logger.warning(f"Attempt to access with invalid API key: {api_key}")
        raise credentials_exception


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    """
    Get the current user from the token.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_token(token)
        if not payload:
            logger.warning(f"Attempt to access with invalid token: {token}")
            raise credentials_exception

        if "email" not in payload:
            logger.warning(f"Attempt to access with expired token: {token}")
            raise credentials_exception

        _user = await User.get(email=payload["email"])

        return _user

    except InvalidTokenError:
        logger.warning(f"Attempt to access with invalid token: {token}")
        raise credentials_exception


async def get_current_user_or_client(
    token: Annotated[Optional[str], Depends(oauth2_scheme)],
    api_key: Annotated[Optional[str], Security(api_key_header)],
):
    """
    Unified function to authenticate either a user or an API client.
    - If an API key is present, authenticate the client.
    - Otherwise, authenticate as a regular user.
    """
    print(f"Token: {token}")
    logger.warning(f"Token: {token}")
    logger.warning(f"API Key: {api_key}")
    if api_key:
        return await get_current_client(api_key)
    elif token:
        return await get_current_user(token)

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Missing authentication credentials",
    )


def is_admin(user: dict = Depends(get_current_user)):
    """Check if user is an admin."""
    if user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to perform this action.",
        )
    return True
