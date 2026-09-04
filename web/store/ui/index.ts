'use client'
import { create } from 'zustand'

interface IUIState {
  isRoundOverModalOpen: boolean
  setIsRoundOverModalOpen: (isOpen: boolean) => void
  reset: () => void
}

export const uiStore = create<IUIState>((set) => ({
  isRoundOverModalOpen: false,

  reset: () => set({ isRoundOverModalOpen: false }),
  setIsRoundOverModalOpen: (isOpen: boolean) => set({ isRoundOverModalOpen: isOpen }),
}))
