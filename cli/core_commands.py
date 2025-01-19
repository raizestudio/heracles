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
from models.core import Menu

app = typer.Typer()
settings = Settings()
console = Console()


@app.command()
def createmenu(name: str):
    """Create menu"""

    async def _create_menu():
        await Tortoise.init(
            db_url=settings.db_url,
            modules={"models": ["models.core"]},
        )
        _menu = await Menu.create(name=name)
        typer.echo(_menu)

        await Tortoise.close_connections()

    run_async(_create_menu())


@app.command()
def listmenus():
    """List all menus."""

    async def _list_menu():
        await Tortoise.init(
            db_url=settings.db_url,
            modules={"models": ["models.core"]},
        )
        _menus = await Menu.all()
        for menu in _menus:
            typer.echo(menu.name)

        await Tortoise.close_connections()

    run_async(_list_menu())


@app.command()
def getmenu(name: str):
    """Get menu information"""

    async def _get_menu():
        await Tortoise.init(db_url=settings.db_url, modules={"models": ["models.core"]})

        try:
            _menu = await Menu.get(name=name)
            table = Table("ID", "NAME", "PARENT")
            table.add_row(str(_menu.id), _menu.name, _menu.parent)
            console.print(table)

        except DoesNotExist:
            r_print(f"[bold red]Menu[/bold red] [italic white]{name}[/italic white] [bold red]match does not exist![/bold red] :boom:")

        await Tortoise.close_connections()

    run_async(_get_menu())


if __name__ == "__main__":
    app()
