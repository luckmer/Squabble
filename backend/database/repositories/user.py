from typing import Annotated

from fastapi import Depends

from database import Database
from database.database import get_db
from database.query.user import (
    delete_user,
    get_user_by_email,
    get_user_by_id,
    get_user_by_username,
    insert_user,
    update_password,
)
from schemas import User


class UserRepository:
    def __init__(self, db: Database):
        self.db = db

    async def get_user_by_email(self, email: str):
        if self.db.cursor is None or self.db.database is None:
            raise RuntimeError("Database is not connected.")

        data = await self.db.cursor.execute(get_user_by_email, (email,))
        return await data.fetchone()

    async def get_user_by_id(self, id: str):
        if self.db.cursor is None or self.db.database is None:
            raise RuntimeError("Database is not connected.")
        data = await self.db.cursor.execute(get_user_by_id, (id,))
        return await data.fetchone()

    async def get_user_by_username(self, username: str):
        if self.db.cursor is None or self.db.database is None:
            raise RuntimeError("Database is not connected.")

        data = await self.db.cursor.execute(get_user_by_username, (username,))
        return await data.fetchone()

    async def create_user(self, new_user: User):
        await self.db.execute_query(
            insert_user,
            (
                new_user.id,
                new_user.email,
                new_user.username,
                new_user.hashed_password,
                new_user.created_at,
            ),
        )
        return new_user

    async def delete_user(self, user_id: str):
        return await self.db.execute_query(
            delete_user,
            (user_id,),
        )

    async def update_password(self, user_id: str, new_password: str):
        return await self.db.execute_query(
            update_password,
            (new_password, user_id),
        )


async def get_user_repository(
    db: Annotated[Database, Depends(get_db)],
) -> UserRepository:
    return UserRepository(db)
