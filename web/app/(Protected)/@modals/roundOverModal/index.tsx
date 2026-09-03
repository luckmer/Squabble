'use client'
import { getGame } from '@libs/GameService'
import RoundOverModal from '@pages/Modals/RoundOverModal'
import { gameSelector } from '@store/game/selector'
import { uiSelector } from '@store/ui/selector'

const RoundOverModalRoot = () => {
  const { isRoundOverModalOpen, setIsRoundOverModalOpen } = uiSelector()
  const { game: board, setGame, wordsFound } = gameSelector()

  return (
    <RoundOverModal
      isOpen={isRoundOverModalOpen}
      answers={board.answers}
      wordsFound={wordsFound}
      onClickCloseModal={() => {
        setIsRoundOverModalOpen(false)
        const newBoard = getGame().startGame(4)
        setGame(newBoard)
      }}
      onClickGenerateNewBoard={() => {
        setIsRoundOverModalOpen(false)
        const newBoard = getGame().startGame(4)
        setGame(newBoard)
      }}
    />
  )
}

export default RoundOverModalRoot
