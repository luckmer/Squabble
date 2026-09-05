get_user_recent_games = """
    SELECT *
    FROM recent_games
    WHERE user_id = ?
      AND id > ?
    ORDER BY id ASC
    LIMIT ?
"""


get_user_recent_games_stats = """
  SELECT
      COUNT(*) AS games_played,
      SUM(words_solved) AS words_solved,
      SUM(words_total) AS words_total,
      AVG(duration_seconds) AS avg_duration,
      AVG(words_solved) AS avg_words_solved
  FROM recent_games
  WHERE user_id = ?;
"""


insert_recent_game = """
  INSERT INTO recent_games (user_id, opponent_name, game_mode, played_at, duration_seconds, words_solved, words_total)
  VALUES ( ?, ?, ?, ?, ?, ?, ?)
"""


delete_user_recent_games = """
  DELETE FROM recent_games WHERE user_id = ?
"""
