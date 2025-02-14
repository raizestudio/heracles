import pytest


class TestAuthenticateRoutes:
    """Test suite for /authenticate endpoint."""

    @pytest.mark.asyncio
    async def test_successful_authentication(self, client, test_user):
        """Test successful authentication."""
        print(f"Client: {client}")
        print(f"Test User: {test_user}")
        print(f"Test User username: {test_user.username}")
        response = await client.post("/auth/authenticate", data={"username": str(test_user.email), "password": "test"})
        print(f"Response: {response}")
        assert response.status_code == 200
        assert "token" in response.json()
