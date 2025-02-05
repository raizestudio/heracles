from typing import List

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # APP
    app_name: str = "Heracles"
    app_version: str = "0.0.0"
    app_api_version: str = "v1"
    app_api_host: str = "localhost"
    # LOGGING
    log_file_path: str = "logs"
    log_file_name: str = "api.log"
    log_file_max_bytes: int = 5 * 1024 * 1024
    log_backup_count: int = 3
    # DB
    db_user: str = "heracles"
    db_password: str = "heracles"
    db_host: str = "localhost"
    db_port: int = 5432
    db_name: str = "heracles"
    db_url: str = f"postgres://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    # CACHE
    cache_host: str = "localhost"
    cache_port: int = 6379
    cache_db: int = 0
    # RABBITMQ
    rabbitmq_user: str = "heracles"
    rabbitmq_password: str = "heracles"
    rabbitmq_host: str = "localhost"
    rabbitmq_port: int = 5672
    # COMMON
    debug: bool = True

    models: List[str] = [
        "users",
        "auth",
        "clients",
        "geo",
        "assets",
        "services",
        "operators",
        "agency",
    ]

    required_dirs: List[str] = [
        "uploads",
        "uploads/avatars",
        "uploads/documents",
        "logs",
    ]

    class Config:
        env_file = ".env"
