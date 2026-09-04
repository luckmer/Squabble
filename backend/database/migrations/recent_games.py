recent_games_table = """
    CREATE TABLE IF NOT EXISTS recent_games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        opponent_name TEXT,
        game_mode TEXT NOT NULL,
        played_at TEXT NOT NULL,
        duration_seconds TEXT NOT NULL,
        words_solved TEXT NOT NULL,
        words_total TEXT NOT NULL
    )
"""
