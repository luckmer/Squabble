import { ILoginResponse, IRegisterResponse } from '@interfaces/api/auth/interfaces'
import { getApi } from '@libs/ApiService'
import { ENDPOINTS } from '@static/enpoints'

export const loginUser = async (username: string, password: string): Promise<ILoginResponse> => {
  const api = getApi()
  return await api.post<ILoginResponse>(ENDPOINTS.LOGIN, {
    username,
    password,
  })
}

export const getUserStatistics = async () => {
  const api = getApi()
  return await api.get(ENDPOINTS.STATISTICS)
}

export const registerUser = async (
  email: string,
  username: string,
  password: string,
): Promise<IRegisterResponse> => {
  const api = getApi()
  return await api.post<IRegisterResponse>(ENDPOINTS.REGISTER, { email, username, password })
}
