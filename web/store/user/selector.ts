import { createSelectors } from '@store/helper'
import { userStore } from '.'

export const userSelector = createSelectors(userStore)
