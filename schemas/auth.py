from pydantic import BaseModel


class AuthenticationSchema(BaseModel):
    email: str
    password: str


class AuthenticationTokenSchema(BaseModel):
    token: str
