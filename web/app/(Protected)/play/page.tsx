'use client'

import { setRecentGame } from '@api/recentGames/server'
import { GAME_MODE } from '@interfaces/api/recentGames/enums'
import { IRecentGame } from '@interfaces/api/recentGames/interfaces'
import { getGame } from '@libs/GameService'
import Play from '@pages/Play'
import { gameSelector } from '@store/game/selector'
import { recentGamesSelector } from '@store/recentGames/selector'
import { uiSelector } from '@store/ui/selector'
import { userSelector } from '@store/user/selector'
import { useEffect } from 'react'

const PlayRoot = () => {
  const setIsRoundOverModalOpen = uiSelector.use.setIsRoundOverModalOpen()
  const setCurrentSession = gameSelector.use.setCurrentSession()
  const onClickSetFoundWord = gameSelector.use.onClickSetFoundWord()
  const session = gameSelector.use.currentSession()
  const setGame = gameSelector.use.setGame()
  const wordsFound = gameSelector.use.wordsFound()
  const user = userSelector.use.user()
  const board = gameSelector.use.game()

  const endCurrentSession = () => {
    const { setLocalRecentGame, setUpdateGamesPlayed } = recentGamesSelector.getState()
    const { currentSession, game, wordsFound } = gameSelector.getState()
    const { user } = userSelector.getState()

    if (!user?.id || !currentSession) return
    if (!game.answers.length) return

    const startedAt = new Date(currentSession.played_at).getTime()

    const endedAt = Date.now()

    const endSession: IRecentGame = {
      id: currentSession.id,
      user_id: user.id,
      opponent_name: '',
      played_at: currentSession.played_at,
      game_mode: currentSession.game_mode,
      duration_seconds: Math.floor((endedAt - startedAt) / 1000),
      words_solved: wordsFound.length,
      words_total: game.answers.length,
    }

    setLocalRecentGame(endSession)
    setUpdateGamesPlayed(1)

    void setRecentGame(endSession).catch(() => {})
  }

  useEffect(() => {
    if (board.board.length) return

    const newBoard = getGame().startGame(4)

    setGame(newBoard)
  }, [board.board.length, setGame])

  useEffect(() => {
    if (session !== null) return

    const now = Date.now()

    const newSession: IRecentGame = {
      id: now,
      user_id: user?.id ?? '----',
      opponent_name: '',
      played_at: new Date(now).toISOString(),
      duration_seconds: 0,
      game_mode: GAME_MODE.SINGLE_PLAYER,
      words_solved: 0,
      words_total: 0,
    }

    setCurrentSession(newSession)
  }, [session, setCurrentSession, user])

  useEffect(() => {
    return () => {
      endCurrentSession()
      const { setGame } = gameSelector.getState()
      const newBoard = getGame().startGame(4)
      setGame(newBoard)
    }
  }, [])

  return (
    <Play
      board={board.board}
      answers={board.answers}
      wordsFound={wordsFound}
      onClickFinishBoard={() => {
        setIsRoundOverModalOpen(true)
      }}
      onClickSetFoundWord={(word) => {
        onClickSetFoundWord(word)
      }}
      onClickGenerateNewBoard={() => {
        const newBoard = getGame().startGame(4)
        setGame(newBoard)
      }}
    />
  )
}

export default PlayRoot
