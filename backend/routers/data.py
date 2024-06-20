import aiohttp
from fastapi import APIRouter

from src.constants import PB, PocketbaseCollections, SearchData

router = APIRouter()


@router.get("/data/interests", tags=["data"])
async def login():
    async with aiohttp.ClientSession() as client:
        interests = await PB.fetch_records(PocketbaseCollections.INTERESTS, client)
        return interests["items"]


@router.post("/data/users", tags=["data"])
async def users(params: SearchData):
    async with aiohttp.ClientSession() as client:
        filter = []
        if params.surname != "":
            filter.append(f"surname='{params.surname}'")
        if params.name != "":
            filter.append(f"name='{params.name}'")
        if params.gender != "":
            filter.append(f"gender='{params.gender}'")
        if params.city != "":
            filter.append(f"city='{params.city}'")
        (
            filter.append(f"years>={params.years[0]}&&years<={params.years[1]}")
            if params.years[0] != params.years[1]
            else filter.append(f"years={params.years[0]}")
        )

        if len(params.interests) != 0:
            for interest in params.interests:
                filter.append(f"interests~'{interest}'")

        users = await PB.fetch_records(
            PocketbaseCollections.USERS,
            client,
            filter="".join(
                f"&&{item}" if i != 0 else item for i, item in enumerate(filter)
            ),
            expand="interests",
        )
        return users["items"]


@router.get("/data/likes", tags=["data"])
async def likes(user_id: str):
    async with aiohttp.ClientSession() as client:
        return await PB.fetch_records(
            PocketbaseCollections.LIKES,
            client,
            filter=f"receiver='{user_id}'",
            expand="interests",
        )
