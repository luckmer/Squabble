'use client'
import { deleteUserProfile } from '@api/user/server'
import Settings from '@pages/Settings'
import { gameSelector } from '@store/game/selector'
import { uiSelector } from '@store/ui/selector'
import { userSelector } from '@store/user/selector'
import { useRouter } from 'next/navigation'

const SettingsRoot = () => {
  const router = useRouter()
  const boardReset = gameSelector.use.reset()
  const recentGamesReset = gameSelector.use.reset()
  const uiReset = uiSelector.use.reset()
  const userReset = userSelector.use.reset()

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
      onClickDeleteAccount={() =>
        handleSubmit().catch(() => {
          return false
        })
      }
    />
  )
}

export default SettingsRoot
