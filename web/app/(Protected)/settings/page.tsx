'use client'
import { deleteUserProfile } from '@api/user/server'
import Settings from '@pages/Settings'
import { gameSelector } from '@store/game/selector'
import { uiSelector } from '@store/ui/selector'
import { userSelector } from '@store/user/selector'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const SettingsRoot = () => {
  const user = userSelector.use.user()
  const router = useRouter()
  const boardReset = gameSelector.use.reset()
  const recentGamesReset = gameSelector.use.reset()
  const uiReset = uiSelector.use.reset()
  const userReset = userSelector.use.reset()
  const setIsChangePasswordModalOpen = uiSelector.use.setIsChangePasswordModalOpen()

  const handleSubmit = async () => {
    try {
      await deleteUserProfile()
      boardReset()
      recentGamesReset()
      uiReset()
      userReset()
      router.push('/')
      return true
    } catch {
      return false
    }
  }

  return (
    <Settings
      user={user}
      onClickChangePassword={() => {
        setIsChangePasswordModalOpen(true)
      }}
      onClickDeleteAccount={() => {
        const promise = handleSubmit()
        toast.promise(promise, {
          loading: 'Deleting account',
          success: 'Account deleted successfully',
          error: 'Something went wrong',
          classNames: {
            toast: 'border-border! bg-card! text-foreground!',
          },
        })

        return promise
      }}
    />
  )
}

export default SettingsRoot
