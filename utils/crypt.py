from bcrypt import checkpw as bcrypt_checkpw
from bcrypt import gensalt, hashpw


def hash_password(password: str) -> str:
    return hashpw(password.encode(), gensalt()).decode()


def check_password(password: str, hashed: str) -> bool:
    return bcrypt_checkpw(password.encode(), hashed.encode())
