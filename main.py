import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routers import auth, core, users
from utils.db import Database

app = FastAPI()
app.include_router(core.router, tags=["Core"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"])

try:
    os.makedirs("uploads")
    os.makedirs("uploads/avatars")
except FileExistsError:
    pass

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

Database.init(app)

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"message": "Hestia is running"}


# if __name__ == "__main__":
#     import uvicorn

#     uvicorn.run(app, host="0.0.0.0", port=8000)
