import { GAME_MODE } from './enums'

export interface IRecentGame {
  id: number
  user_id: string
  opponent_name: string
  played_at: string
  game_mode: GAME_MODE
  duration_seconds: number
  words_solved: number
  words_total: number
}

export interface IRecentGameResponse {
  items: IRecentGame[]
  next_cursor: string | null
}

export interface IRecentGameStats {
  games_played: number
  solve_rate: number
}
