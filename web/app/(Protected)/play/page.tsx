'use client'
import { getGame } from '@libs/GameService'
import Play from '@pages/Play'
import { gameSelector } from '@store/game/selector'

const PlayRoot = () => {
  const setGame = gameSelector().setGame
  const board = gameSelector().game

  if (!board.board.length) {
    const board = getGame().startGame(4)
    setGame(board)
  }

  return (
    <Play
      board={board.board}
      answers={board.answers}
      onClickFinishBoard={() => {}}
      onClickGenerateNewBoard={() => {
        const board = getGame().startGame(4)
        setGame(board)
      }}
    />
  )
}

export default PlayRoot
