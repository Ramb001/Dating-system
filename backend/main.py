import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import users, data, likes


logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)


app = FastAPI()
app.include_router(users.router)
app.include_router(data.router)
app.include_router(likes.router)


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)