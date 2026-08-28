from fastapi import APIRouter, Depends

from database.database import Database, get_db
from models.auth import LoginUserRequest, RegisterUserRequest, User
from models.security import TokenResponse
from services.auth_service import login_user_service, register_user_service

router = APIRouter(prefix="/v1/auth", tags=["auth"])


@router.post("/register", response_model=User)
async def register(data: RegisterUserRequest, db: Database = Depends(get_db)):
    return await register_user_service(db, data)


@router.post("/login", response_model=TokenResponse)
async def login_user(data: LoginUserRequest, db: Database = Depends(get_db)):
    return await login_user_service(db, data)


@router.post("/refresh")
async def refresh_token(db: Database = Depends(get_db)):
    return "soon"
