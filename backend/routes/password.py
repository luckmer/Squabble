from typing import Annotated

from fastapi import APIRouter, Depends

from services import PasswordService, get_password_service

router = APIRouter(prefix="/v1/auth/pasword", tags=["password"])


@router.post(
    "/forgot",
)
async def forgot_password(
    password_service: Annotated[PasswordService, Depends(get_password_service)],
):
    pass


@router.post(
    "/reset",
)
async def reset_password(
    password_service: Annotated[PasswordService, Depends(get_password_service)], ś
):
    pass
