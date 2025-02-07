import pytest
from fastapi import FastAPI
from httpx import ASGITransport, AsyncClient
from tortoise import Tortoise

from config import Settings
from models.auth import ApiKey, Token
from models.clients import Client
from models.geo import Email
from models.users import User
from routers.core import router
from utils.crypt import generate_token
from utils.db import Database

app = FastAPI()
app.include_router(router)

settings = Settings()
db = Database()


@pytest.fixture(scope="function", autouse=True)
async def init_db():
    """Set up and tear down the test database."""
    await db.create_test_db()
    await Tortoise.init(
        db_url=settings.db_url_test,
        modules={"models": [f"models.{model}" for model in settings.models]},
    )
    await Tortoise.generate_schemas()
    yield
    await Tortoise.close_connections()


@pytest.fixture
async def client():
    """Create an HTTP client for tests."""
    async with AsyncClient(base_url="http://test", transport=ASGITransport(app=app)) as client:
        yield client


@pytest.fixture
async def test_client():
    """Create a test client with an API key."""
    _client = await Client.create(name="test_client")
    _api_key = await ApiKey.create(key=generate_token({"client_id": str(_client.id)}), client=_client)
    return _api_key.key, str(_client.id)


# @pytest.fixture
# async def test_user():
#     """Create a test user token."""
#     _email = await Email.create(email="test@test.io")
#     _user = await User.create(username="test_user", first_name="Coco", last_name="Jojo", email=_email, password="test")
#     return generate_token({"email": str(_user.email)}), str(_user.id)


class TestInfoRoutes:
    """Test suite for /info route."""

    @pytest.mark.asyncio
    async def test_health_no_auth(self, client):
        """Test with unauthorized requests are rejected."""
        response = await client.get("/info", headers={"X-API-KEY": "invalid_key"})
        assert response.status_code == 401
        assert response.json() == {"detail": "Could not validate credentials"}

    @pytest.mark.asyncio
    async def test_info_client(self, client, test_client):
        """Test access with a valid API key."""
        api_key, client_id = test_client
        response = await client.get("/info", headers={"X-API-KEY": api_key})
        assert response.status_code == 200
        assert response.json() == {"name": settings.app_name, "version": settings.app_version, "version_api": settings.app_api_version, "client": client_id}

    @pytest.mark.asyncio
    async def test_info_user(self, client, test_user):
        """Test access with a valid Bearer token."""
        token, user_id = test_user
        response = await client.get("/info", headers={"Authorization": f"Bearer {token}"})
        assert response.status_code == 200
        assert response.json() == {"name": settings.app_name, "version": settings.app_version, "version_api": settings.app_api_version, "user": user_id}
