from typing import Annotated

from fastapi import APIRouter, Depends, Query

from schemas import RecentGameCreate
from security import security
from services import RecentGamesService, get_recent_games_service

router = APIRouter(
    prefix="/v1/recent-games",
    tags=["recent games"],
)


@router.get("/")
async def get_recent_games(
    user_id: Annotated[str, Depends(security.validate_token)],
    recent_games_service: Annotated[
        RecentGamesService, Depends(get_recent_games_service)
    ],
    cursor: Annotated[str | None, Query()] = None,
    limit: Annotated[int, Query(ge=1, le=100)] = 10,
):
    return await recent_games_service.get_recent_games(
        user_id=user_id,
        cursor=cursor,
        limit=limit,
    )


@router.post("/")
async def create_recent_game(
    user_id: Annotated[str, Depends(security.validate_token)],
    recent_game: RecentGameCreate,
    recent_games_service: Annotated[
        RecentGamesService, Depends(get_recent_games_service)
    ],
):

    return await recent_games_service.create_recent_game(recent_game, user_id)
