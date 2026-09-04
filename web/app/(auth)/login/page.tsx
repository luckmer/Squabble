'use client'
import { loginUser } from '@api/auth/client'
import { getUserProfile } from '@api/user/server'
import Login from '@pages/Login'
import { userSelector } from '@store/user/selector'
import { useRouter } from 'next/navigation'

export default function LoginRoot() {
  const navigate = useRouter()
  const setUser = userSelector.use.setUser()

  const handleSubmit = async (username: string, password: string) => {
    try {
      await loginUser(username, password)
      const user = await getUserProfile()
      setUser(user)
      navigate.push('/dashboard')
      return true
    } catch {
      return false
    }
  }

  return (
    <Login
      onSubmit={async (data) =>
        handleSubmit(data.username, data.password).catch(() => {
          return false
        })
      }
    />
  )
}
