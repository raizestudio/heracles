import typer
from user_commands import app as user_app

app = typer.Typer()

app.add_typer(user_app, name="user")

if __name__ == "__main__":
    app()
