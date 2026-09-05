get_user_by_email = """
  SELECT email FROM users WHERE email = ?
"""

get_user_by_username = """
  SELECT id, username, email, hashed_password, created_at
  FROM users
  WHERE username = ?
"""

get_user_by_id = """
  SELECT id, username, email, hashed_password, created_at
  FROM users
  WHERE id = ?
"""

insert_user = """
  INSERT INTO users (id, email, username, hashed_password, created_at)
  VALUES (?, ?, ?, ?, ?)
"""

delete_user = """
  DELETE FROM users WHERE id = ?
"""
