from schemas.user import get_user_by_email, insert_user, get_user_by_username
from models.user import RegisterUserRequest, User, LoginUserRequest
from models.security import TokenResponse
from datetime import datetime, timezone
from database.database import Database
from security.index import security
from fastapi import HTTPException
import uuid
import bcrypt


async def register_user_service(db: Database, payload: RegisterUserRequest) -> User:
    cursor = await db.cursor.execute(get_user_by_email, (payload.email,))
    existing_user = await cursor.fetchone()

    username_cursor = await db.cursor.execute(get_user_by_username, (payload.username,))
    existing_username = await username_cursor.fetchone()

    if existing_user is not None or existing_username is not None:
        raise HTTPException(status_code=409, detail="User already exists")

    password = bcrypt.hashpw(payload.password.encode(), bcrypt.gensalt()).decode()

    new_user = User(
        id=str(uuid.uuid4()),
        email=payload.email,
        username=payload.username,
        hashed_password=password,
        created_at=datetime.now(timezone.utc).isoformat(),
    )

    await db.execute_query(
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


async def login_user_service(db: Database, payload: LoginUserRequest):
    cursor = await db.cursor.execute(get_user_by_username, (payload.username,))
    row = await cursor.fetchone()

    if row is None:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    existing_user = User(**row)

    if not bcrypt.checkpw(
        payload.password.encode(), existing_user.hashed_password.encode()
    ):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    return TokenResponse(
        access_token=security.create_access_token(existing_user.id),
        refresh_token=security.create_refresh_token(existing_user.id),
    )
