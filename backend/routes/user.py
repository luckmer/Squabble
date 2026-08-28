from typing import Annotated

from fastapi import APIRouter, Depends

from database.database import Database, get_db
from security.index import security
from services.user_service import get_user_profile_service, get_user_statistics_service

router = APIRouter(prefix="/v1/user", tags=["user"])


@router.get("/statistics")
async def get_user_statistics(
    user_id: Annotated[str, Depends(security.validate_token)],
    db: Database = Depends(get_db),
):
    return await get_user_statistics_service(db, user_id)


@router.get("/profile")
async def get_user_profile(
    user_id: Annotated[str, Depends(security.validate_token)],
    db: Database = Depends(get_db),
):
    return await get_user_profile_service(db, user_id)
