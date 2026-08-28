import aiosqlite

from schemas.user import user_creation_table


class Database:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self.database: aiosqlite.Connection | None = None
        self.cursor: aiosqlite.Cursor | None = None
        self._initialized = True

    async def connect(self):
        if self.database is not None:
            return
        self.database = await aiosqlite.connect("database.db")
        self.database.row_factory = aiosqlite.Row
        self.cursor = await self.database.cursor()
        await self.init_tables()

    async def init_tables(self):
        await self.cursor.execute(user_creation_table)
        await self.database.commit()

    async def close(self):
        if self.database is not None:
            await self.database.close()
            self.database = None
            self.cursor = None

    async def execute_query(self, query, params=()):
        await self.connect()
        await self.cursor.execute(query, params)
        await self.database.commit()


db = Database()


async def get_db() -> Database:
    return db
