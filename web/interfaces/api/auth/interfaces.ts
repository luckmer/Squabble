export interface ILoginResponse {
  sucess: boolean
}
export interface IRegisterResponse {
  id: string
  email: string
  username: string
  created_at: string
}

export interface IRefreshToken {
  access_token: string
  refresh_token: string
}
