from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Hestia"
    db_user: str = "heracles"
    db_password: str = "heracles"
    db_host: str = "localhost"
    db_port: int = 5432
    db_name: str = "heracles"
    db_url: str = f"postgres://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    debug: bool = True

    class Config:
        env_file = ".env"
