from typing import Any, Sequence

import aiosqlite

from .migrations import recent_games_table, user_creation_table


class Database:
    _instance: Database | None = None
    _initialized: bool

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self) -> None:
        if self._initialized:
            return

        self.database: aiosqlite.Connection | None = None
        self.cursor: aiosqlite.Cursor | None = None
        self._initialized = True

    async def connect(self) -> None:
        if self.database is not None:
            return
        self.database = await aiosqlite.connect("database.db")
        self.database.row_factory = aiosqlite.Row
        self.cursor = await self.database.cursor()
        await self.init_tables()

    async def init_tables(self) -> None:
        if self.cursor is None or self.database is None:
            raise RuntimeError("Database is not connected.")
        await self.cursor.execute(user_creation_table)
        await self.cursor.execute(recent_games_table)
        await self.database.commit()

    async def close(self) -> None:
        if self.database is not None:
            await self.database.close()
            self.database = None
            self.cursor = None

    async def execute_query(self, query: str, params: Sequence[Any] = ()) -> None:
        if self.cursor is None or self.database is None:
            raise RuntimeError("Database is not connected.")
        await self.cursor.execute(query, params)
        await self.database.commit()


db = Database()


async def get_db() -> Database:
    return db
