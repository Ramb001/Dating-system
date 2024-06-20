import aiohttp
from fastapi import APIRouter, Request

from src.constants import (
    PB,
    LoginData,
    PocketbaseCollections,
    SignupData,
    UpdateInfo,
    UpdateInterests,
)

router = APIRouter()


@router.post("/users/signin", tags=["users"])
async def signin(params: LoginData):
    async with aiohttp.ClientSession() as client:
        user_ = await PB.fetch_records(
            PocketbaseCollections.USERS,
            client,
            filter=f"(login='{params.login}'&&password='{params.password}')",
        )
        if len(user_["items"]):
            user = user_["items"][0]
            return {
                "status": True,
                "user_id": user["id"],
            }
    return {"status": False}


@router.post("/users/signup", tags=["users"])
async def signup(params: SignupData):
    async with aiohttp.ClientSession() as client:
        logins = await PB.fetch_records(
            PocketbaseCollections.USERS,
            client,
            filter=f"login='{params.login}'",
        )

        if len(logins["items"]) > 0:
            return {"status": False}
        else:
            await PB.add_record(
                PocketbaseCollections.USERS,
                client,
                login=params.login,
                password=params.password,
                surname=params.surname,
                name=params.name,
                years=params.years,
                gender=params.gender,
                city=params.city,
                interests=[],
                marital_status=params.maritalStatus,
                children=params.children,
                height=params.height,
                hair_color=params.hairColor,
                eye_color=params.eyeColor,
                profession=params.profession,
            )
            return {"status": True}


@router.get("/users/info", tags=["users"])
async def user_info(user_id: str):
    async with aiohttp.ClientSession() as client:
        user_ = await PB.fetch_records(
            PocketbaseCollections.USERS,
            client,
            filter=f"id='{user_id}'",
            expand="interests",
        )
        return user_["items"][0]


@router.post("/users/edit/info", tags=["users"])
async def edit_info(params: UpdateInfo):
    async with aiohttp.ClientSession() as client:
        await PB.update_record(
            PocketbaseCollections.USERS,
            params.id,
            client,
            surname=params.surname,
            name=params.name,
            gender=params.gender,
            description=params.description,
            city=params.city,
            years=params.years,
            marital_status=params.maritalStatus,
            children=params.children,
            height=params.height,
            hair_color=params.hairColor,
            eye_color=params.eyeColor,
            profession=params.profession,
        )


@router.post("/users/edit/interests", tags=["users"])
async def edit_interests(params: UpdateInterests):
    async with aiohttp.ClientSession() as client:
        await PB.update_record(
            PocketbaseCollections.USERS,
            params.user_id,
            client,
            interests=params.interests,
        )


@router.post("/users/edit/avatar", tags=["users"])
async def edit_avatar(params):
    async with aiohttp.ClientSession() as client:
        await PB.update_record(
            PocketbaseCollections.USERS,
            params.user_id,
            client,
            avatar=params.file,
        )
