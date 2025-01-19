import typer
from auth_commands import app as auth_app
from core_commands import app as core_app
from user_commands import app as user_app

app = typer.Typer()

app.add_typer(core_app, name="core")
app.add_typer(auth_app, name="auth")
app.add_typer(user_app, name="user")

if __name__ == "__main__":
    app()
