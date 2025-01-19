import sys
from pathlib import Path

import typer
from tortoise import Tortoise, run_async

sys.path.append(str(Path(__file__).resolve().parent.parent))

from rich import print as r_print
from tortoise.exceptions import DoesNotExist

from config import Settings
from models.auth import Refresh, Session, Token
from models.users import User
from utils.crypt import (
    check_password,
    decode_token,
    generate_refresh_token,
    generate_token,
)

app = typer.Typer()
settings = Settings()


@app.command()
def authenticate(email: str, password: str):
    """Authenticate user"""

    async def _authenticate():
        await Tortoise.init(
            db_url=settings.db_url,
            modules={"models": ["models.users", "models.auth"]},
        )

        try:
            _user = await User.get(email=email)

            if not check_password(password, _user.password):
                r_print(f"[bold red]Password[/bold red] [italic white]{password}[/italic white] [bold red]does not match![/bold red] :boom:")

                return

            try:
                _session = await Session.get(user=_user).prefetch_related("token")
                r_print(f"[bold]User[/bold] [italic]{_user}[/italic] [bold]already has a session[/bold] {_session} [bold].[/bold]")

                generated_token = generate_token(email)
                generated_refresh_token = generate_refresh_token()

                _token = await Token.create(token=generated_token, user=_user)
                _refresh = await Refresh.create(token=generated_refresh_token, user=_user)

                _session.token = _token
                _session.refresh = _refresh
                await _session.save()

                r_print(f"[bold]Generated jwt token[/bold] [bold gray]->[/bold gray] [blue]{generated_token}[/blue]")
                r_print(f"[bold]Generated refresh token[/bold] [bold gray]->[/bold gray] [blue]{generated_refresh_token}[/blue]")
                r_print(f"[bold]Updated session [/bold] [bold gray]->[/bold gray] [blue]{_session}[/blue]")

            except DoesNotExist:
                generated_token = generate_token(email)
                generated_refresh_token = generate_refresh_token()

                _token = await Token.create(token=generated_token, user=_user)
                _refresh = await Refresh.create(token=generated_refresh_token, user=_user)
                _session = await Session.create(token=_token, refresh=_refresh, user=_user)

                r_print(f"[bold]Generated jwt token[/bold] [bold gray]->[/bold gray] [blue]{generated_token}[/blue]")
                r_print(f"[bold]Generated refresh token[/bold] [bold gray]->[/bold gray] [blue]{generated_refresh_token}[/blue]")
                r_print(f"[bold]Generated session [/bold] [bold gray]->[/bold gray] [blue]{_session}[/blue]")

        except DoesNotExist:
            r_print(f"[bold red]User[/bold red] [italic white]{email}[/italic white] [bold red]match does not exist![/bold red] :boom:")

        await Tortoise.close_connections()

    run_async(_authenticate())


# @app.command()
# def listusers():
#     """List all users."""

#     async def _list_users():
#         await Tortoise.init(
#             db_url=settings.db_url,
#             modules={"models": ["models.users"]},
#         )
#         users = await User.all()
#         for user in users:
#             typer.echo(user.username)

#         await Tortoise.close_connections()

#     run_async(_list_users())


if __name__ == "__main__":
    app()
