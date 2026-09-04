import { createSelectors } from '@store/helper'
import { recentGamesStore } from '.'

export const recentGamesSelector = createSelectors(recentGamesStore)
