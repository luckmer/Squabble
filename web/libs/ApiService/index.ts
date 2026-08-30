import { ApiService } from './apiService'

let _api: ApiService | undefined

export const getApi = (): ApiService => {
  if (_api) return _api
  _api = new ApiService()

  return _api
}
