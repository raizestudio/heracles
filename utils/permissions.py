from fastapi import Depends, HTTPException, status


def is_admin(user: dict = Depends(get_current_user)):
    """Check if user is an admin."""
    if user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to perform this action.",
        )
    return True
