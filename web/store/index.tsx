'use client'

import { IPublicUser } from '@interfaces/api/user/interfaces'
import { FC, useLayoutEffect } from 'react'
import { userStore } from './user/index'

export interface IStore {
  user: IPublicUser | null
  children: React.ReactNode
}

export const Store: FC<IStore> = ({ user, children }) => {
  useLayoutEffect(() => {
    userStore.setState({
      user,
      status: user ? 'authenticated' : 'unauthenticated',
    })
  }, [user])

  return <>{children}</>
}
