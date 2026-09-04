'use client'
import { IPublicUser } from '@interfaces/api/user/interfaces'
import { create } from 'zustand'

interface UserState {
  user: IPublicUser | null
  status: 'authenticated' | 'unauthenticated'

  setUser: (user: IPublicUser | null) => void
  reset: () => void
}

export const userStore = create<UserState>((set) => ({
  user: null,
  status: 'unauthenticated',
  game: {
    board: [],
    answers: [],
  },

  reset: () => set({ user: null, status: 'unauthenticated' }),
  setUser: (user) => set({ user, status: user !== null ? 'authenticated' : 'unauthenticated' }),
}))
