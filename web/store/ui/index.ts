'use client'
import { create } from 'zustand'

interface IUIState {
  isRoundOverModalOpen: boolean
  setIsRoundOverModalOpen: (isOpen: boolean) => void
}

export const uiStore = create<IUIState>((set) => ({
  isRoundOverModalOpen: false,
  setIsRoundOverModalOpen: (isOpen: boolean) => set({ isRoundOverModalOpen: isOpen }),
}))
