from database.database import Database
from models.auth import UserPublic
from schemas.user import get_user_by_id
from fastapi import HTTPException, status


async def get_user_profile_service(db: Database, user_id: str):
    user_profile = await db.cursor.execute(get_user_by_id, (user_id,))
    profile = await user_profile.fetchone()

    if profile is not None:
        return UserPublic(
            id=profile["id"],
            email=profile["email"],
            username=profile["username"],
            created_at=profile["created_at"],
        )

    return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")


async def get_user_statistics_service(db: Database, user_id: str):

    return ""
