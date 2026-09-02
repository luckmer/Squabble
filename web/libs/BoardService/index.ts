import { BoardServiceCore } from './boardServiceCore'

let _boardService: BoardServiceCore | undefined
let _lastBoard: string[][] | undefined

export const getBoard = (board: string[][]): BoardServiceCore => {
  if (_boardService !== undefined && JSON.stringify(_lastBoard) === JSON.stringify(board)) {
    return _boardService
  }

  _boardService = new BoardServiceCore(board)
  _lastBoard = board
  return _boardService
}
