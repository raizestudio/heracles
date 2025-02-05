import sys
from pathlib import Path

import pytest
from fastapi import FastAPI
from httpx import ASGITransport, AsyncClient

sys.path.append(str(Path(__file__).resolve().parent.parent))

from routers.core import router

app = FastAPI()
app.include_router(router)


@pytest.mark.asyncio
async def test_info():
    async with AsyncClient(base_url="http://test", transport=ASGITransport(app=app)) as client:
        response = await client.get("/info", headers={"X-API-KEY": "test"})

    assert response.status_code == 401
    assert response.json() == {"detail": "Could not validate credentials"}
