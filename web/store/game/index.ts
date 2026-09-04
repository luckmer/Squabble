'use client'

import { IRecentGame } from '@interfaces/api/recentGames/interfaces'
import { create } from 'zustand'

export interface IGame {
  board: string[][]
  answers: string[]
}

interface IGameState {
  game: IGame
  wordsFound: string[]
  currentSession: IRecentGame | null
  setGame: (game: IGame) => void
  setCurrentSession: (session: IRecentGame) => void
  onClickSetFoundWord: (word: string) => void
  reset: () => void
}

const defaultGame: IGame = {
  board: [],
  answers: [],
}

export const gameStore = create<IGameState>((set) => ({
  game: defaultGame,
  wordsFound: [],
  currentSession: null,

  reset() {
    set({
      game: defaultGame,
      wordsFound: [],
      currentSession: null,
    })
  },

  setGame: (game) =>
    set({
      game,
      wordsFound: [],
      currentSession: null,
    }),

  setCurrentSession: (currentSession: IRecentGame) =>
    set(() => {
      return {
        currentSession,
      }
    }),

  onClickSetFoundWord: (word) =>
    set((state) => {
      if (state.wordsFound.includes(word)) {
        return state
      }
      return {
        wordsFound: [...state.wordsFound, word],
      }
    }),
}))
