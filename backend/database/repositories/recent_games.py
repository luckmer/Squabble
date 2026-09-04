from typing import Annotated

from fastapi import Depends

from database import Database, get_db
from database.query.recent_games import (
    get_user_recent_games,
    insert_recent_game,
)
from schemas import RecentGame, RecentGameCreate


class RecentGamesRepository:
    def __init__(self, db: Database):
        self.db = db

    async def get_recent_games(
        self,
        user_id: str,
        cursor: int | None,
        limit: int,
    ) -> list[RecentGame]:
        if self.db.cursor is None or self.db.database is None:
            raise RuntimeError("Database is not connected.")

        data = await self.db.cursor.execute(
            get_user_recent_games,
            (user_id, cursor or 0, limit + 1),
        )

        rows = await data.fetchall()

        return [
            RecentGame(
                id=row["id"],
                user_id=row["user_id"],
                opponent_name=row["opponent_name"],
                game_mode=row["game_mode"],
                played_at=row["played_at"],
                duration_seconds=row["duration_seconds"],
                words_solved=row["words_solved"],
                words_total=row["words_total"],
            )
            for row in rows
        ]

    async def create_recent_game(
        self, recent_game: RecentGameCreate, user_id: str
    ) -> RecentGameCreate:

        if self.db.cursor is None or self.db.database is None:
            raise RuntimeError("Database is not connected.")

        await self.db.execute_query(
            insert_recent_game,
            (
                user_id,
                recent_game.opponent_name,
                recent_game.game_mode,
                recent_game.played_at,
                recent_game.duration_seconds,
                recent_game.words_solved,
                recent_game.words_total,
            ),
        )

        return recent_game


async def get_recent_games_repository(
    db: Annotated[Database, Depends(get_db)],
) -> RecentGamesRepository:
    return RecentGamesRepository(db)
