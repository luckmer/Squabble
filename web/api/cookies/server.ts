'use server'

import { refreshToken } from '@api/session/server'
import { cookies } from 'next/headers'

export const refreshServerAccessToken = async () => {
  const cookieStore = await cookies()
  const tokens = await refreshToken()
  cookieStore.set('access_token', tokens.access_token)
}

export const deleteCookies = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('access_token')
  cookieStore.delete('refresh_token')
}
