import { GridServiceCore } from './gridServiceCore'

let _gridService: GridServiceCore | undefined

export const getGrid = (): GridServiceCore => {
  if (_gridService) {
    return _gridService
  }

  _gridService = new GridServiceCore()
  return _gridService
}
