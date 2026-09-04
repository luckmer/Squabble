from typing import Annotated

from fastapi import APIRouter, Depends, Response

from schemas import LoginUserRequest, RegisterUserRequest, TokenResponse, User
from security import security
from services import AuthService, get_auth_service

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
    tokens: TokenResponse = await auth_service.login_user(data)
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
    auth_service: Annotated[AuthService, Depends(get_auth_service)],
):

    return auth_service.token_refresh(response, user_id)


@router.get("/validate")
def validate_sesstion(_: Annotated[str, Depends(security.validate_token)]):
    return {"success": True}
