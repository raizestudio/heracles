from tortoise.contrib.fastapi import register_tortoise

from config import Settings

settings = Settings()


class Database:
    @staticmethod
    def init(app):
        """
        Initialize the database connection for the FastAPI app.

        Args:
            app: The FastAPI application instance.
            db_url: The database connection string.
        """
        register_tortoise(
            app,
            db_url=settings.db_url,
            modules={"models": ["models.users", "models.services", "models.assets", "models.auth"]},
            generate_schemas=True,
            add_exception_handlers=True,
        )
