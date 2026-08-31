'use client'
import { logoutUser } from '@api/auth/client'
import { IPublicUser } from '@interfaces/api/user/interfaces'
import Header from '@pages/Header'
import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'

export interface IProps {
  user: IPublicUser | null
}

const HeaderRoot: FC<IProps> = ({ user }) => {
  const pathname = usePathname()
  const navigate = useRouter()

  const onClickLogout = async () => {
    try {
      await logoutUser()
      navigate.push('/')
    } catch {}
  }

  return (
    <Header
      pathname={pathname}
      isAuthenticated={user !== null}
      user={user}
      onClickLogout={async () => {
        onClickLogout().catch(() => {})
      }}
    />
  )
}

export default HeaderRoot
