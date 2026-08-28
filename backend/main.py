from contextlib import asynccontextmanager

from fastapi import FastAPI

from database.database import db
from routes import auth, health, password, user


@asynccontextmanager
async def lifespan(_: FastAPI):
    await db.connect()
    yield
    await db.close()


app = FastAPI(lifespan=lifespan)

app.include_router(auth.router)
app.include_router(password.router)
app.include_router(health.router)
app.include_router(user.router)
