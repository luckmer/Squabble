import { getApi } from '@libs/ApiService'
import { ENDPOINTS } from '@static/enpoints'

export const refreshAuthToken = async () => {
  const api = getApi()
  return await api.post(ENDPOINTS.REFRESH)
}

export const validateAuthToken = async () => {
  const api = getApi()
  return api.get(ENDPOINTS.VALIDATE)
}
