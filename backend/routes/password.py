from typing import Annotated

from fastapi import APIRouter, Depends

from schemas import ChangePasswordRequest
from security import security
from services import PasswordService, get_password_service

router = APIRouter(prefix="/v1/auth/password", tags=["password"])


@router.post(
    "/update",
)
async def update_password(
    password_service: Annotated[PasswordService, Depends(get_password_service)],
    user_id: Annotated[str, Depends(security.validate_token)],
    data: ChangePasswordRequest,
):
    """simple update password without any email verification"""
    return await password_service.update_password(user_id, data)
