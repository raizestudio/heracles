from typing import List

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from tortoise.contrib.fastapi import HTTPNotFoundError
from tortoise.exceptions import DoesNotExist, IntegrityError

from models.users import User
from schemas.users import UserCreate, UserRead

router = APIRouter()


@router.get("/", response_model=List[UserRead])
async def get_users():
    users = await User.all()
    return users


@router.get(
    "/{user_id}",
    responses={status.HTTP_404_NOT_FOUND: {"description": "User not found"}},
)
async def get_user(user_id: int):
    _user: UserRead = await User.get(id=user_id)
    if not _user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return _user


@router.post(
    "/",
    responses={400: {"description": "User with this email or username already exists"}},
)
async def create_user(user: UserCreate):
    try:
        new_user = await User.create(username=user.username, password=user.password, email=user.email, first_name=user.first_name, last_name=user.last_name)
        return {"message": "User created successfully", "user": new_user}
    except IntegrityError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User with this email or username already exists")


@router.put(
    "/{user_id}",
    responses={404: {"description": "User not found"}},
)
async def update_user(user_id: int, user: UserCreate):
    _user: UserRead = await User.get(id=user_id)
    if not _user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    await _user.update(username=user.username, password=user.password, email=user.email, first_name=user.first_name, last_name=user.last_name)
    return {"message": "User updated successfully", "user": _user}


@router.patch(
    "/{user_id}",
    responses={404: {"description": "User not found"}},
)
async def patch_user(user_id: int, user: UserCreate):
    _user: UserRead = await User.get(id=user_id)
    if not _user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    await _user.update(username=user.username, password=user.password, email=user.email, first_name=user.first_name, last_name=user.last_name)
    return {"message": "User updated successfully", "user": _user}


@router.delete(
    "/{user_id}",
    responses={404: {"description": "User not found"}},
)
async def delete_user(user_id: int):
    _user: UserRead = await User.get(id=user_id)
    if not _user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    await _user.delete()
    return {"message": "User deleted successfully", "user": _user}


@router.post("/{user_id}/upload-avatar", response_model=dict)
async def upload_avatar(user_id: int, file: UploadFile = File(...)):
    """
    Endpoint to upload a user's avatar.
    """
    # Validate the file type (optional)
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPEG or PNG allowed.")

    try:
        user = await User.get(id=user_id)
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="User not found.")

    # Save the file to a directory
    file_location = f"uploads/avatars/{user_id}_{file.filename}"
    with open(file_location, "wb") as f:
        f.write(await file.read())

    # Update the user's avatar field
    user.avatar = file_location
    await user.save()

    return {"message": "Avatar uploaded successfully", "avatar_url": file_location}
