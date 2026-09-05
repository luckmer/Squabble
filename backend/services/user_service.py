from fastapi import Depends, HTTPException, status

from database.repositories.user import UserRepository, get_user_repository
from schemas import UserPublic


class UserService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def get_user_profile(self, user_id: str) -> UserPublic:
        user = await self.user_repo.get_user_by_id(user_id)

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        return UserPublic(
            id=user["id"],
            email=user["email"],
            username=user["username"],
            created_at=user["created_at"],
        )


def get_user_service(
    user_repo: UserRepository = Depends(get_user_repository),
) -> UserService:
    return UserService(user_repo)
