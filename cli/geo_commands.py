import sys
from pathlib import Path

import typer
from rich import print as r_print
from rich.console import Console
from rich.table import Table
from tortoise import Tortoise, run_async
from tortoise.exceptions import DoesNotExist

sys.path.append(str(Path(__file__).resolve().parent.parent))

from config import Settings
from models.geo import Continent, Country

app = typer.Typer()
settings = Settings()
console = Console()


@app.command()
def listcontinents():
    """List all continents."""

    async def _list_continents():
        await Tortoise.init(
            db_url=settings.db_url,
            modules={"models": ["models.geo"]},
        )
        _continents = await Continent.all()
        table = Table("Code", "Name")
        for continent in _continents:
            table.add_row(continent.code, continent.name)
        console.print(table)

        await Tortoise.close_connections()

    run_async(_list_continents())


@app.command()
def createcontinent(code: str, name: str):
    """Create continent"""

    async def _create_continent():
        await Tortoise.init(
            db_url=settings.db_url,
            modules={"models": ["models.geo"]},
        )
        _continent = await Continent.create(code=code, name=name)
        typer.echo(_continent)

        await Tortoise.close_connections()

    run_async(_create_continent())


if __name__ == "__main__":
    app()
