'use client'

import { logoutUser } from '@api/auth/server'
import { IPublicUser } from '@interfaces/api/user/interfaces'
import Header from '@pages/Header'
import { gameSelector } from '@store/game/selector'
import { uiSelector } from '@store/ui/selector'
import { userSelector } from '@store/user/selector'
import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'

export interface IProps {
  user: IPublicUser | null
}

const HeaderRoot: FC<IProps> = ({ user }) => {
  const board = gameSelector.use.game()
  const boardReset = gameSelector.use.reset()
  const recentGamesReset = gameSelector.use.reset()
  const uiReset = uiSelector.use.reset()
  const userReset = userSelector.use.reset()
  const wordsFound = gameSelector.use.wordsFound()

  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logoutUser()
      boardReset()
      recentGamesReset()
      uiReset()
      userReset()
      router.push('/')
    } catch {}
  }

  return (
    <Header
      pathname={pathname}
      isAuthenticated={user !== null}
      user={user}
      wordsFound={wordsFound.length}
      answers={board.answers.length}
      onClickLogout={handleLogout}
    />
  )
}

export default HeaderRoot
