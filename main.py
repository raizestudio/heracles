import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import signals  # noqa
from config import Settings
from middlewares.authentication import jwt_auth_middleware
from routers import assets, auth, core, geo, services, users
from utils.db import Database

app = FastAPI(title=Settings().app_name, version=Settings().app_version)

# app.middleware("http")(jwt_auth_middleware)

app.include_router(core.router, tags=["Core"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(services.router, prefix="/services", tags=["Services"])
app.include_router(assets.router, prefix="/assets", tags=["Assets"])
app.include_router(geo.router, prefix="/geo", tags=["Geo"])

try:
    os.makedirs("uploads")
    os.makedirs("uploads/avatars")
    os.makedirs("uploads/documents")

except FileExistsError:
    pass

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

Database.init(app)

origins = [
    "http://localhost",
    "http://localhost:3000",
    f"http://{Settings().app_api_host}",
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
    return {"message": f"{Settings().app_name} is running"}
