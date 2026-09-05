import uuid
from datetime import datetime, timezone

import bcrypt
from fastapi import Depends, HTTPException, Response, status

from database.repositories.user import UserRepository, get_user_repository
from schemas import (
    LoginUserRequest,
    RegisterUserRequest,
    User,
    UserPublic,
)
from security import security


class AuthService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def register_user(self, payload: RegisterUserRequest) -> UserPublic:
        existing_email = await self.user_repo.get_user_by_email(payload.email)
        existing_username = await self.user_repo.get_user_by_username(payload.username)

        if existing_email or existing_username:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail="User already exists"
            )

        hashed_password = bcrypt.hashpw(
            payload.password.encode(), bcrypt.gensalt()
        ).decode()

        new_user = User(
            id=str(uuid.uuid4()),
            email=payload.email,
            username=payload.username,
            hashed_password=hashed_password,
            created_at=datetime.now(timezone.utc).isoformat(),
        )

        created = await self.user_repo.create_user(new_user)

        return UserPublic(
            id=created.id,
            email=created.email,
            username=created.username,
            created_at=created.created_at,
        )

    async def login_user(self, payload: LoginUserRequest) -> str:
        user = await self.user_repo.get_user_by_username(payload.username)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password",
            )

        existing_user = User(**user)

        if not bcrypt.checkpw(
            payload.password.encode(), existing_user.hashed_password.encode()
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password",
            )

        return existing_user.id

    async def delete_account(self, response: Response, user_id: str):
        await self.user_repo.delete_user(user_id)
        security.clear_auth_cookies(response)


def get_auth_service(
    user_repo: UserRepository = Depends(get_user_repository),
) -> AuthService:
    return AuthService(user_repo)
