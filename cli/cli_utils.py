import importlib
import json
import sys
from pathlib import Path

from tortoise import Tortoise

sys.path.append(str(Path(__file__).resolve().parent.parent))

from config import Settings

settings = Settings()


async def load_fixture(app: str, model: str, env: str = "prod"):
    await Tortoise.init(
        db_url=settings.db_url,
        modules={"models": [f"models.{app}"]},
    )

    await Tortoise.generate_schemas()

    module = importlib.import_module(f"models.{app}")
    model_class = getattr(module, model.capitalize())

    with open(f"fixtures/{env}/{model}.json", "r") as f:
        data = json.load(f)
        for item in data:
            await model_class.update_or_create(**item)

    await Tortoise.close_connections()
