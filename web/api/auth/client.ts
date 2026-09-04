'use client'
import { ILoginResponse } from '@interfaces/api/auth/interfaces'
import { getApi } from '@libs/ApiService'
import { ENDPOINTS } from '@static/enpoints'

export const loginUser = async (username: string, password: string): Promise<ILoginResponse> => {
  const api = getApi()

  const user = await api.post<ILoginResponse>(ENDPOINTS.LOGIN, {
    username,
    password,
  })

  return user
}
