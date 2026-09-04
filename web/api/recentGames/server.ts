'use server'
import { refreshServerAccessToken } from '@api/cookies/server'
import {
  IRecentGame,
  IRecentGameResponse,
  IRecentGameStats,
} from '@interfaces/api/recentGames/interfaces'
import { getApi } from '@libs/ApiService'
import { ENDPOINTS } from '@static/enpoints'
import { cookies } from 'next/headers'

export const getRecentGames = async (cursor?: string | null): Promise<IRecentGameResponse> => {
  const api = getApi()

  try {
    const cookieStore = await cookies()
    const data = await api.get<IRecentGameResponse>(
      cursor ? `${ENDPOINTS.RECENT_GAMES}?cursor=${cursor}&limit=10` : `${ENDPOINTS.RECENT_GAMES}`,
      {
        cookie: cookieStore.toString(),
      },
    )
    return data
  } catch (error) {
    const is409 = error instanceof Error && error.message.includes('409')

    if (is409) {
      try {
        await refreshServerAccessToken()
        const data = await api.get<IRecentGameResponse>(ENDPOINTS.RECENT_GAMES)
        return data
      } catch {
        return { items: [], next_cursor: null }
      }
    }

    return { items: [], next_cursor: null }
  }
}

export const getRecentGamesStats = async (): Promise<IRecentGameStats> => {
  const api = getApi()

  try {
    const cookieStore = await cookies()
    const data = await api.get<IRecentGameStats>(ENDPOINTS.STATS, {
      cookie: cookieStore.toString(),
    })
    return data
  } catch (error) {
    const is409 = error instanceof Error && error.message.includes('409')

    if (is409) {
      try {
        await refreshServerAccessToken()
        const data = await api.get<IRecentGameStats>(ENDPOINTS.STATS)
        return data
      } catch {
        return { games_played: 0, solve_rate: 0 }
      }
    }

    return { games_played: 0, solve_rate: 0 }
  }
}

export const setRecentGame = async (recentGame: IRecentGame): Promise<void> => {
  const api = getApi()

  try {
    const cookieStore = await cookies()

    await api.post(
      ENDPOINTS.RECENT_GAMES,
      {
        opponent_name: recentGame.opponent_name,
        game_mode: recentGame.game_mode,
        played_at: recentGame.played_at,
        duration_seconds: recentGame.duration_seconds,
        words_solved: recentGame.words_solved,
        words_total: recentGame.words_total,
      },
      {
        cookie: cookieStore.toString(),
      },
    )
  } catch (error) {
    const is409 = error instanceof Error && error.message.includes('409')
    if (is409) {
      try {
        await refreshServerAccessToken()
        await api.post(ENDPOINTS.RECENT_GAMES, {
          opponent_name: recentGame.opponent_name,
          game_mode: recentGame.game_mode,
          played_at: recentGame.played_at,
          duration_seconds: recentGame.duration_seconds,
          words_solved: recentGame.words_solved,
          words_total: recentGame.words_total,
        })
      } catch {}
    }
  }
}
