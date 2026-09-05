import bcrypt
from fastapi import Depends, HTTPException, status

from database.repositories.user import UserRepository, get_user_repository
from schemas import ChangePasswordRequest, User


class PasswordService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def update_password(self, user_id: str, data: ChangePasswordRequest):
        print(user_id, data)
        user = await self.user_repo.get_user_by_id(user_id)
        existing_user = User(**user)

        if not bcrypt.checkpw(
            data.old_password.encode(), existing_user.hashed_password.encode()
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid old password",
            )

        hashed_password = bcrypt.hashpw(
            data.new_password.encode(), bcrypt.gensalt()
        ).decode()

        return await self.user_repo.update_password(user_id, hashed_password)


def get_password_service(
    user_repo: UserRepository = Depends(get_user_repository),
) -> PasswordService:
    return PasswordService(user_repo)
