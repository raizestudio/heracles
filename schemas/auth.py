from pydantic import BaseModel


class AuthenticaSchema(BaseModel):
    email: str
    password: str
