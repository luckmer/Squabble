'use client'
import { create } from 'zustand'

export interface IGame {
  board: string[][]
  answers: string[]
}

interface IGameState {
  game: IGame
  setGame: (game: IGame) => void
}

export const gameStore = create<IGameState>((set) => ({
  game: {
    board: [],
    answers: [],
  },
  setGame: (game) =>
    set({
      game: {
        board: game.board,
        answers: game.answers,
      },
    }),
}))
