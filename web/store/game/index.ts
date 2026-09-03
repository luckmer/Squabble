'use client'
import { create } from 'zustand'

export interface IGame {
  board: string[][]
  answers: string[]
}

interface IGameState {
  game: IGame
  wordsFound: string[]
  setGame: (game: IGame) => void
  onClickSetFoundWord: (word: string) => void
}

export const gameStore = create<IGameState>((set) => ({
  wordsFound: [],
  game: {
    board: [],
    answers: [],
  },

  onClickSetFoundWord: (word) =>
    set((state) => {
      if (state.wordsFound.includes(word)) return state
      const wordsFound = [...state.wordsFound, word]
      return { wordsFound }
    }),

  setGame: (game) =>
    set({
      wordsFound: [],
      game: {
        board: game.board,
        answers: game.answers,
      },
    }),
}))
