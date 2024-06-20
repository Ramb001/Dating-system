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
async def login(params: SearchData):
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

        if len(filter) != 1:
            users = await PB.fetch_records(
                PocketbaseCollections.USERS,
                client,
                filter="".join(
                    f"&&{item}" if i != 0 else item for i, item in enumerate(filter)
                ),
                expand="interests",
            )
        else:
            users = await PB.fetch_records(
                PocketbaseCollections.USERS,
                client,
            )
        return users["items"]
