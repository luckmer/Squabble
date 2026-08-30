import { getApi } from '@libs/ApiService'
import { ENDPOINTS } from '@static/enpoints'

export const loginUser = async (username: string, password: string) => {
  const api = getApi()
  return await api.post(ENDPOINTS.LOGIN, { username, password })
}

export const registerUser = async (email: string, username: string, password: string) => {
  const api = getApi()
  return await api.post(ENDPOINTS.REGISTER, { email, username, password })
}
