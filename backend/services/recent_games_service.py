from fastapi import Depends

from database.repositories.recent_games import (
    RecentGamesRepository,
    get_recent_games_repository,
)
from schemas import RecentGameCreate, RecentGamesResponse, RecentGamesStats
from utils.cursor import CursorPagination


class RecentGamesService:
    def __init__(self, recent_games_repo: RecentGamesRepository):
        self.recent_games_repo = recent_games_repo

    async def get_recent_games(
        self,
        user_id: str,
        cursor: str | None = None,
        limit: int = 10,
    ) -> RecentGamesResponse:
        offset = 0
        position = None

        if cursor is not None:
            decoded = CursorPagination.decode_cursor(cursor)
            offset = decoded.offset
            position = decoded.position

        items = await self.recent_games_repo.get_recent_games(
            user_id,
            position,
            limit + 1,
        )

        has_next = len(items) > limit
        items = items[:limit]

        next_cursor = None

        if has_next and items:
            next_cursor = CursorPagination.encode_cursor(
                offset=offset + limit,
                position=items[-1].id,
            )

        return RecentGamesResponse(
            items=items,
            next_cursor=next_cursor,
        )

    async def get_recent_game_stats(self, user_id: str):
        stats = await self.recent_games_repo.get_recent_game_stats(user_id)
        games_played = 0
        solve_rate = 0.0

        if stats:
            games_played = stats["games_played"]

            words_total = stats["words_total"] or 0
            words_solved = stats["words_solved"] or 0

            if words_total > 0:
                solve_rate = words_solved / words_total

        return RecentGamesStats(
            games_played=games_played,
            solve_rate=solve_rate,
        )

    async def create_recent_game(
        self, recent_game: RecentGameCreate, user_id: str
    ) -> RecentGameCreate:
        return await self.recent_games_repo.create_recent_game(recent_game, user_id)

    async def delete_user_recent_games(self, user_id: str):
        return await self.recent_games_repo.delete_user_recent_games(user_id)


def get_recent_games_service(
    recent_games_repo: RecentGamesRepository = Depends(get_recent_games_repository),
) -> RecentGamesService:
    return RecentGamesService(recent_games_repo)
