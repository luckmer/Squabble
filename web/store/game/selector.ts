import { createSelectors } from '@store/helper'
import { gameStore } from '.'

export const gameSelector = createSelectors(gameStore)
