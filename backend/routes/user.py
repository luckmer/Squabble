from typing import Annotated

from fastapi import APIRouter, Depends

from database.database import Database
from security.index import security
from services import get_user_service, UserService

router = APIRouter(prefix="/v1/user", tags=["user"])


@router.get("/statistics")
async def get_user_statistics(
    user_id: Annotated[str, Depends(security.validate_token)],
    user_service: UserService = Depends(get_user_service),
):
    return await user_service.get_user_statistics(user_id)


@router.get("/profile")
async def get_user_profile(
    user_id: Annotated[str, Depends(security.validate_token)],
    user_service: UserService = Depends(get_user_service),
):
    return await user_service.get_user_profile(user_id)
