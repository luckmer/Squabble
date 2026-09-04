from .auth import router as auth_router
from .health import router as health_router
from .password import router as password_router
from .recent_games import router as recent_games_router
from .user import router as user_router

__all__ = [
    "auth_router",
    "health_router",
    "password_router",
    "user_router",
    "recent_games_router",
]
