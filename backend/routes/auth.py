from services.auth_service import register_user_service, login_user_service
from models.user import User, RegisterUserRequest, LoginUserRequest
from models.security import TokenResponse
from database.database import Database, get_db
from fastapi import APIRouter, Depends

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
