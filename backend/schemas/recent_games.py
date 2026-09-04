from datetime import datetime

from pydantic import BaseModel


class RecentGame(BaseModel):
    id: int
    user_id: str
    opponent_name: str | None
    game_mode: str
    played_at: datetime
    duration_seconds: int
    words_solved: int
    words_total: int


class RecentGamesResponse(BaseModel):
    items: list[RecentGame]
    next_cursor: str | None


class RecentGameCreate(BaseModel):
    opponent_name: str
    game_mode: str
    played_at: datetime
    duration_seconds: int
    words_solved: int
    words_total: int
