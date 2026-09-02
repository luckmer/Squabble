import { GameServiceCore } from './gameServiceCore'

let _gameService: GameServiceCore | undefined

export const getGame = (): GameServiceCore => {
  if (_gameService !== undefined) {
    return _gameService
  }

  _gameService = new GameServiceCore()
  return _gameService
}
