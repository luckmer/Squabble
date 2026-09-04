'use client'
import { setRecentGame } from '@api/recentGames/server'
import { IRecentGame } from '@interfaces/api/recentGames/interfaces'
import { getGame } from '@libs/GameService'
import RoundOverModal from '@pages/Modals/RoundOverModal'
import { gameSelector } from '@store/game/selector'
import { recentGamesSelector } from '@store/recentGames/selector'
import { uiSelector } from '@store/ui/selector'
import { userSelector } from '@store/user/selector'

const RoundOverModalRoot = () => {
  const setLocalRecentGame = recentGamesSelector.use.setLocalRecentGame()
  const setUpdateGamesPlayed = recentGamesSelector.use.setUpdateGamesPlayed()
  const setIsRoundOverModalOpen = uiSelector.use.setIsRoundOverModalOpen()
  const currentSession = gameSelector.use.currentSession()
  const isRoundOverModalOpen = uiSelector.use.isRoundOverModalOpen()
  const setGame = gameSelector.use.setGame()
  const wordsFound = gameSelector.use.wordsFound()
  const user = userSelector.use.user()
  const board = gameSelector.use.game()

  return (
    <RoundOverModal
      isOpen={isRoundOverModalOpen}
      answers={board.answers}
      wordsFound={wordsFound}
      onClickGoToDashboard={() => {
        setIsRoundOverModalOpen(false)
        const newBoard = getGame().startGame(4)
        setGame(newBoard)
      }}
      onClickGenerateNewBoard={() => {
        setIsRoundOverModalOpen(false)
        const newBoard = getGame().startGame(4)

        if (user?.id && currentSession) {
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
            words_total: board.answers.length,
          }

          setLocalRecentGame(endSession)
          setUpdateGamesPlayed(1)
          void setRecentGame(endSession).catch(() => {})
        }

        setGame(newBoard)
      }}
    />
  )
}

export default RoundOverModalRoot
