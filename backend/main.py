from fastapi import FastAPI
from contextlib import asynccontextmanager
from routes import auth, password, health
from database.database import db


@asynccontextmanager
async def lifespan(_: FastAPI):
    await db.connect()
    yield
    await db.close()


app = FastAPI(lifespan=lifespan)

app.include_router(auth.router)
app.include_router(password.router)
app.include_router(health.router)
