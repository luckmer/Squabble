'use server'
import { deleteCookies } from '@api/cookies/server'
import { IRegisterResponse } from '@interfaces/api/auth/interfaces'
import { getApi } from '@libs/ApiService'
import { ENDPOINTS } from '@static/enpoints'

export const registerUser = async (
  email: string,
  username: string,
  password: string,
): Promise<IRegisterResponse> => {
  const api = getApi()
  return await api.post<IRegisterResponse>(ENDPOINTS.REGISTER, { email, username, password })
}

export const logoutUser = async () => {
  const api = getApi()
  await deleteCookies()
  return await api.post<IRegisterResponse>(ENDPOINTS.LOGOUT)
}
