'use client'

import { getRecentGames, getRecentGamesStats } from '@api/recentGames/server'
import { IRecentGame } from '@interfaces/api/recentGames/interfaces'
import { create } from 'zustand'

export interface IRecentGamesStore {
  recentGames: IRecentGame[]
  localRecentGames: IRecentGame[]

  nextCursor: string | null

  isGamesLoading: boolean
  isGamesFetched: boolean
  isGamesPrevLoading: boolean
  isGamesLoadingMore: boolean

  games_played: number
  solve_rate: number
  isStatsLoading: boolean
  isStatsFetched: boolean
  isStatsPrevLoading: boolean

  error: string | null

  fetchRecentGames: (cursor?: string | null) => Promise<void>
  fetchRecentGamesStats: () => Promise<void>

  setUpdateGamesPlayed: (playedGames: number) => void
  setLocalRecentGame: (recentGame: IRecentGame) => void

  reset: () => void
}

export const recentGamesStore = create<IRecentGamesStore>((set, get) => ({
  recentGames: [],
  localRecentGames: [],

  nextCursor: null,

  isGamesLoading: false,
  isGamesFetched: false,
  isGamesPrevLoading: true,
  isGamesLoadingMore: false,

  games_played: 0,
  solve_rate: 0,
  isStatsLoading: false,
  isStatsFetched: false,
  isStatsPrevLoading: true,

  error: null,

  reset() {
    set({
      recentGames: [],
      localRecentGames: [],
      nextCursor: null,
      isGamesLoading: false,
      isGamesFetched: false,
      isGamesPrevLoading: true,
      isGamesLoadingMore: false,
      games_played: 0,
      solve_rate: 0,
      isStatsLoading: false,
      isStatsFetched: false,
      isStatsPrevLoading: true,
      error: null,
    })
  },

  fetchRecentGames: async (cursor = null) => {
    const { isGamesLoading, isGamesLoadingMore } = get()

    if (cursor && isGamesLoadingMore) return
    if (!cursor && isGamesLoading) return

    set({
      error: null,
      ...(cursor
        ? {
            isGamesLoadingMore: true,
          }
        : {
            isGamesLoading: true,
            isGamesPrevLoading: true,
          }),
    })

    try {
      const response = await getRecentGames(cursor)

      set((state) => ({
        recentGames: cursor ? [...state.recentGames, ...response.items] : response.items,

        nextCursor: response.next_cursor,

        ...(cursor
          ? {
              isGamesLoadingMore: false,
            }
          : {
              isGamesLoading: false,
              isGamesFetched: true,
              isGamesPrevLoading: false,
            }),
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch games',

        ...(cursor
          ? {
              isGamesLoadingMore: false,
            }
          : {
              isGamesLoading: false,
              isGamesFetched: true,
              isGamesPrevLoading: false,
            }),
      })
    }
  },

  fetchRecentGamesStats: async () => {
    const { isStatsLoading } = get()

    if (isStatsLoading) return

    set({
      isStatsLoading: true,
      isStatsPrevLoading: true,
      error: null,
    })

    try {
      const stats = await getRecentGamesStats()
      set({
        games_played: stats.games_played,
        solve_rate: stats.solve_rate,
        isStatsLoading: false,
        isStatsFetched: true,
        isStatsPrevLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch stats',
        isStatsLoading: false,
        isStatsFetched: true,
        isStatsPrevLoading: false,
      })
    }
  },

  setUpdateGamesPlayed: (playedGames) => {
    if (!playedGames) return

    set((state) => ({
      games_played: state.games_played + playedGames,
    }))
  },

  setLocalRecentGame: (recentGame) => {
    set((state) => ({
      localRecentGames: [recentGame, ...state.localRecentGames],
    }))
  },
}))
