import pytest
from fastapi import FastAPI
from httpx import ASGITransport, AsyncClient
from tortoise import Tortoise

from config import Settings
from routers.auth import router
from utils.db import Database

app = FastAPI()
app.include_router(router)

settings = Settings()
db = Database()


# class TestAuthenticateRoutes:
#     """Test suite for /authenticate endpoint."""

#     @pytest.mark.asyncio
#     async def test_successful_authentication(self, client: AsyncClient):
#         """Test successful authentication."""
#         response = await client.post("/auth/authenticate", json={"username": "test_user", "password": "test"})
#         assert response.status_code == 200
#         assert "token" in response.json()
