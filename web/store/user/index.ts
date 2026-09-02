'use client'
import { IPublicUser } from '@interfaces/api/user/interfaces'
import { create } from 'zustand'

interface UserState {
  user: IPublicUser | null
  status: 'authenticated' | 'unauthenticated'

  setUser: (user: IPublicUser | null) => void
}

export const userStore = create<UserState>((set) => ({
  user: null,
  status: 'unauthenticated',
  game: {
    board: [],
    answers: [],
  },
  setUser: (user) => set({ user, status: user !== null ? 'authenticated' : 'unauthenticated' }),
}))
