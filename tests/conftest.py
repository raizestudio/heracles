import pytest

from models.geo import Email
from models.users import User
from utils.crypt import generate_token


@pytest.fixture
async def test_user():
    """Create a test user token."""
    _email = await Email.create(email="test@test.io")
    _user = await User.create(username="test_user", first_name="Coco", last_name="Jojo", email=_email, password="test")
    return generate_token({"email": str(_user.email)}), str(_user.id)
