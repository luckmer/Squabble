from fastapi import APIRouter, Depends

from database.database import Database, get_db

router = APIRouter(prefix="/v1/auth/pasword", tags=["password"])


@router.post(
    "/forgot",
)
async def forgot_password(db: Database = Depends(get_db)):
    pass


@router.post(
    "/reset",
)
async def reset_password(db: Database = Depends(get_db)):
    pass
