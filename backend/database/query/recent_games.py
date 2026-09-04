get_user_recent_games = """
    SELECT *
    FROM recent_games
    WHERE user_id = ?
      AND id > ?
    ORDER BY id ASC
    LIMIT ?
"""


insert_recent_game = """
  INSERT INTO recent_games (user_id, opponent_name, game_mode, played_at, duration_seconds, words_solved, words_total)
  VALUES ( ?, ?, ?, ?, ?, ?, ?)
"""
