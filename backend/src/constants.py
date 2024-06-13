import os
from pydantic import BaseModel
from typing import Any

from src.pocketbase import Pocketbase


POCKETBASE_URL = "http://127.0.0.1:8090"
PB = Pocketbase(POCKETBASE_URL)


class PocketbaseCollections:
    USERS = "users"
    INTERESTS = "interests"
    LIKES = "likes"


class LoginData(BaseModel):
    login: str
    password: str


class SignupData(BaseModel):
    login: str
    password: str
    surname: str
    name: str
    years: str
    gender: str
    city: str


class UpdateInfo(BaseModel):
    id: str
    surname: str
    name: str
    gender: str
    description: str
    city: str
    years: int


class UpdateInterests(BaseModel):
    user_id: str
    interests: list[str]


class SearchData(BaseModel):
    surname: str
    name: str
    gender: str
    years: list[int]
    city: str
    interests: list[str]


class LikeData(BaseModel):
    sender: str
    receiver: str
    status: str
