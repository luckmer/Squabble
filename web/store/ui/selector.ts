import { createSelectors } from '@store/helper'
import { uiStore } from '.'

export const uiSelector = createSelectors(uiStore)
