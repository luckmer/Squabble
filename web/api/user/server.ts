'use server'
import { deleteCookies } from '@api/cookies/server'
import { IPublicUser } from '@interfaces/api/user/interfaces'
import { getApi } from '@libs/ApiService'
import { ENDPOINTS } from '@static/enpoints'
import { cookies } from 'next/headers'

export const getUserProfile = async (): Promise<IPublicUser | null> => {
  try {
    const cookieStore = await cookies()
    const api = getApi()
    const data = await api.get<IPublicUser>(ENDPOINTS.PROFILE, {
      cookie: cookieStore.toString(),
    })

    return data
  } catch {
    return null
  }
}

export const deleteUserProfile = async (): Promise<void> => {
  const api = getApi()
  const cookieStore = await cookies()
  await api.delete<void>(ENDPOINTS.DELETE, {
    cookie: cookieStore.toString(),
  })
  await deleteCookies()
}
