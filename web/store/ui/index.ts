'use client'
import { create } from 'zustand'

interface IUIState {
  isRoundOverModalOpen: boolean
  isChangePasswordModalOpen: boolean
  setIsChangePasswordModalOpen: (isOpen: boolean) => void
  setIsRoundOverModalOpen: (isOpen: boolean) => void
  reset: () => void
}

export const uiStore = create<IUIState>((set) => ({
  isRoundOverModalOpen: false,
  isChangePasswordModalOpen: false,
  reset: () => set({ isRoundOverModalOpen: false, isChangePasswordModalOpen: false }),
  setIsChangePasswordModalOpen: (isOpen: boolean) => set({ isChangePasswordModalOpen: isOpen }),
  setIsRoundOverModalOpen: (isOpen: boolean) => set({ isRoundOverModalOpen: isOpen }),
}))
