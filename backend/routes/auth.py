from typing import Annotated

from fastapi import APIRouter, Depends, Response
from database.database import Database, get_db
from models.auth import LoginUserRequest, RegisterUserRequest, User
from models.security import TokenResponse
from security.index import security
from services.auth_service import (
    login_user_service,
    refresh_token_service,
    register_user_service,
)

router = APIRouter(prefix="/v1/auth", tags=["auth"])


@router.post("/register", response_model=User)
async def register(data: RegisterUserRequest, db: Database = Depends(get_db)):
    return await register_user_service(db, data)


@router.post("/login")
async def login_user(
    data: LoginUserRequest,
    response: Response,
    db: Database = Depends(get_db),
):
    tokens: TokenResponse = await login_user_service(db, data)
    security.set_auth_cookies(response, tokens)
    return {"success": True}


@router.post("/logout")
async def logout_user(response: Response):
    security.clear_auth_cookies(response)
    return {"success": True}


@router.post("/refresh")
def refresh_token(
    user_id: Annotated[str, Depends(security.validate_refresh_token)],
    response: Response,
):
    return refresh_token_service(response, user_id)


@router.get("/validate")
def validate_sesstion(_: Annotated[str, Depends(security.validate_token)]):
    return {"success": True}
