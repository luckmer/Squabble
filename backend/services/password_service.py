from fastapi import Depends

from database.repositories.user import UserRepository, get_user_repository


class PasswordService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo


def get_password_service(
    user_repo: UserRepository = Depends(get_user_repository),
) -> PasswordService:
    return PasswordService(user_repo)
