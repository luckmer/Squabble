from typing import Annotated

from fastapi import APIRouter, Depends, Response

from security.index import security
from services import (
    AuthService,
    RecentGamesService,
    UserService,
    get_auth_service,
    get_recent_games_service,
    get_user_service,
)

router = APIRouter(prefix="/v1/user", tags=["user"])


@router.get("/profile")
async def get_user_profile(
    user_id: Annotated[str, Depends(security.validate_token)],
    user_service: UserService = Depends(get_user_service),
):
    return await user_service.get_user_profile(user_id)


@router.delete("/profile")
async def delete_account(
    response: Response,
    user_id: Annotated[str, Depends(security.validate_token)],
    auth_service: Annotated[AuthService, Depends(get_auth_service)],
    recent_games_service: Annotated[
        RecentGamesService,
        Depends(get_recent_games_service),
    ],
):
    await recent_games_service.delete_user_recent_games(user_id)
    await auth_service.delete_account(response, user_id)

    return {"success": True}
