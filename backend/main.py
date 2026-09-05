from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import db
from routes import (
    auth_router,
    health_router,
    password_router,
    recent_games_router,
    session_router,
    user_router,
)


@asynccontextmanager
async def lifespan(_: FastAPI):
    await db.connect()
    yield
    await db.close()


app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(session_router)
app.include_router(password_router)
app.include_router(health_router)
app.include_router(user_router)
app.include_router(recent_games_router)
