'use server'
import { IRefreshToken, IRegisterResponse } from '@interfaces/api/auth/interfaces'
import { getApi } from '@libs/ApiService'
import { ENDPOINTS } from '@static/enpoints'
import { cookies } from 'next/headers'

export const registerUser = async (
  email: string,
  username: string,
  password: string,
): Promise<IRegisterResponse> => {
  const api = getApi()
  return await api.post<IRegisterResponse>(ENDPOINTS.REGISTER, { email, username, password })
}

export const refreshToken = async () => {
  const api = getApi()
  return await api.post<IRefreshToken>(ENDPOINTS.REFRESH)
}

export const logoutUser = async () => {
  const api = getApi()
  const cookieStore = await cookies()

  cookieStore.delete('access_token')
  cookieStore.delete('refresh_token')

  return await api.post<IRegisterResponse>(ENDPOINTS.LOGOUT)
}
