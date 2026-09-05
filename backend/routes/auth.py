from typing import Annotated

from fastapi import APIRouter, Depends, Response

from schemas import LoginUserRequest, RegisterUserRequest, TokenResponse
from security import security
from services import AuthService, get_auth_service
from utils import Session

router = APIRouter(prefix="/v1/auth", tags=["auth"])


@router.post("/register")
async def register(
    data: RegisterUserRequest,
    auth_service: Annotated[AuthService, Depends(get_auth_service)],
):
    return await auth_service.register_user(data)


@router.post("/login")
async def login_user(
    data: LoginUserRequest,
    response: Response,
    auth_service: Annotated[AuthService, Depends(get_auth_service)],
):
    user_id = await auth_service.login_user(data)
    tokens = Session.get_access_tokens(user_id)
    security.set_auth_cookies(response, tokens)

    return {"success": True}


@router.post("/logout")
async def logout_user(response: Response):
    security.clear_auth_cookies(response)
    return {"success": True}
