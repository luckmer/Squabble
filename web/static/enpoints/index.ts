import {
  AUTH_ENDPOINTS,
  HEALTH_ENDPOINTS,
  PASSWORD_ENDPOINTS,
  USER_ENDPOINTS,
} from '@interfaces/endpoints/enums'

export const ENDPOINTS = {
  [AUTH_ENDPOINTS.LOGIN]: 'v1/auth/login',
  [AUTH_ENDPOINTS.REGISTER]: 'v1/auth/register',
  [AUTH_ENDPOINTS.REFRESH]: 'v1/auth/refresh',

  [PASSWORD_ENDPOINTS.FORGOT]: 'v1/auth/password/forgot',
  [PASSWORD_ENDPOINTS.RESET]: 'v1/auth/password/reset',

  [HEALTH_ENDPOINTS.HEALTH]: 'v1/health/health',

  [USER_ENDPOINTS.STATISTICS]: 'v1/user/statistics',
  [USER_ENDPOINTS.PROFILE]: 'v1/user/profile',
}
