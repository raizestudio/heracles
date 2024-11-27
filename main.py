from fastapi import FastAPI

from routers import users
from utils.db import Database

app = FastAPI()
app.include_router(users.router, prefix="/users", tags=["Users"])

Database.init(app)


@app.get("/")
async def read_root():
    return {"message": "Hestia is running"}


# @app.get("/items/{item_id}")
# async def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}
