'use client'
import { logoutUser } from '@api/auth/client'
import { IPublicUser } from '@interfaces/api/user/interfaces'
import { getGame } from '@libs/GameService'
import Header from '@pages/Header'
import { gameSelector } from '@store/game/selector'
import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'

export interface IProps {
  user: IPublicUser | null
}

const HeaderRoot: FC<IProps> = ({ user }) => {
  const setGame = gameSelector().setGame
  const gameBoard = gameSelector().game

  const pathname = usePathname()
  const navigate = useRouter()

  const onClickLogout = async () => {
    try {
      await logoutUser()
      navigate.push('/')
    } catch {}
  }

  return (
    <Header
      pathname={pathname}
      isAuthenticated={user !== null}
      user={user}
      onClickCreateBoard={() => {
        if (gameBoard.board.length) {
          return
        }
        const board = getGame().startGame(4)
        setGame(board)
      }}
      onClickLogout={async () => {
        onClickLogout().catch(() => {})
      }}
    />
  )
}

export default HeaderRoot
