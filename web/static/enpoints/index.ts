import {
  AUTH_ENDPOINTS,
  HEALTH_ENDPOINTS,
  PASSWORD_ENDPOINTS,
  RECENT_GAMES_ENDPOINTS,
  USER_ENDPOINTS,
} from '@interfaces/endpoints/enums'

export const ENDPOINTS = {
  [AUTH_ENDPOINTS.LOGIN]: 'v1/auth/login',
  [AUTH_ENDPOINTS.LOGOUT]: 'v1/auth/logout',
  [AUTH_ENDPOINTS.REGISTER]: 'v1/auth/register',
  [AUTH_ENDPOINTS.REFRESH]: 'v1/auth/refresh',
  [AUTH_ENDPOINTS.VALIDATE]: 'v1/auth/validate',

  [PASSWORD_ENDPOINTS.FORGOT]: 'v1/auth/password/forgot',
  [PASSWORD_ENDPOINTS.RESET]: 'v1/auth/password/reset',

  [HEALTH_ENDPOINTS.HEALTH]: 'v1/health/health',

  [USER_ENDPOINTS.STATISTICS]: 'v1/user/statistics',
  [USER_ENDPOINTS.PROFILE]: 'v1/user/profile',

  [RECENT_GAMES_ENDPOINTS.RECENT_GAMES]: 'v1/recent-games',
  [RECENT_GAMES_ENDPOINTS.STATS]: 'v1/recent-games/stats',
}
