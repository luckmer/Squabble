from fastapi import APIRouter

router = APIRouter(prefix="/v1/health", tags=["health"])


@router.get("/health")
async def health():
    return {"status": "ok"}
