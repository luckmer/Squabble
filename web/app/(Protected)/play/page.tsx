'use client'
import { getGame } from '@libs/GameService'
import Play from '@pages/Play'
import { gameSelector } from '@store/game/selector'
import { uiSelector } from '@store/ui/selector'
import { useEffect } from 'react'

const PlayRoot = () => {
  const { game: board, setGame, onClickSetFoundWord, wordsFound } = gameSelector()
  const { setIsRoundOverModalOpen } = uiSelector()

  useEffect(() => {
    if (!board.board.length) {
      const newBoard = getGame().startGame(4)
      setGame(newBoard)
    }
  }, [board.board.length, setGame])

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
