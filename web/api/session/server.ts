'use server'

import { IRefreshToken } from '@interfaces/api/auth/interfaces'
import { getApi } from '@libs/ApiService'
import { ENDPOINTS } from '@static/enpoints'

export const refreshToken = async () => {
  const api = getApi()
  return await api.post<IRefreshToken>(ENDPOINTS.REFRESH)
}
