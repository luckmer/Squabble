user_creation_table = """
  CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      hashed_password TEXT NOT NULL,
      created_at TEXT NOT NULL
  )
"""
