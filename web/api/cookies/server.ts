'use server'

import { refreshToken } from '@api/auth/server'
import { cookies } from 'next/headers'

export const refreshServerAccessToken = async () => {
  const cookieStore = await cookies()
  const tokens = await refreshToken()
  cookieStore.set('access_token', tokens.access_token)
}
