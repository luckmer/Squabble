'use server'
import { refreshServerAccessToken } from '@api/cookies/server'
import { getApi } from '@libs/ApiService'
import { ENDPOINTS } from '@static/enpoints'
import { cookies } from 'next/headers'

export const changePassword = async (
  oldPassword: string,
  newPassword: string,
): Promise<{ status: boolean; message?: string }> => {
  const api = getApi()
  try {
    const cookieStore = await cookies()
    await api.post(
      ENDPOINTS.UPDATE,
      { old_password: oldPassword, new_password: newPassword },
      {
        cookie: cookieStore.toString(),
      },
    )
    return { status: true }
  } catch (error) {
    const is409 = error instanceof Error && error.message.includes('409')
    const is401 = error instanceof Error && error.message.includes('401')

    if (is401) {
      return { status: false, message: 'Invalid old password' }
    }

    if (is409) {
      try {
        await refreshServerAccessToken()
        await api.post(
          ENDPOINTS.UPDATE,
          { old_password: oldPassword, new_password: newPassword },
          {
            cookie: cookieStore.toString(),
          },
        )
        return { status: true }
      } catch (error) {
        return {
          status: false,
          message: error instanceof Error ? error.message : 'Failed to change password',
        }
      }
    }

    return { status: false, message: 'Failed to change password' }
  }
}
