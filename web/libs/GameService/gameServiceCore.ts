import { getBoard } from '@libs/BoardService'
import { getGrid } from '@libs/GridService'

export class GameServiceCore {
  startGame(size: number) {
    const board = getGrid().getBoard(size)
    const boardSolver = getBoard(board)
    const answers = boardSolver.solveBoard()

    return {
      board,
      answers: answers.slice(0, 24),
    }
  }
}
