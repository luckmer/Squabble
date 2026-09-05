from typing import Annotated

from fastapi import APIRouter, Depends, Response

from security import security
from utils import Session

router = APIRouter(prefix="/v1/session", tags=["session"])


@router.post("/refresh")
def refresh_token(
    user_id: Annotated[str, Depends(security.validate_refresh_token)],
    response: Response,
):

    return Session.token_refresh(response, user_id)


@router.get("/validate")
def validate_sesstion(_: Annotated[str, Depends(security.validate_token)]):
    return {"success": True}
