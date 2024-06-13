import aiohttp
from fastapi import APIRouter, Request

from src.constants import PB, PocketbaseCollections, LikeData

router = APIRouter()


@router.post("/like", tags=["like"])
async def signin(params: LikeData):
    async with aiohttp.ClientSession() as client:
        await PB.add_record(
            PocketbaseCollections.LIKES,
            client,
            sender=params.sender,
            receiver=params.receiver,
            status=params.status,
        )
        return {"status": True}
