'use client'
import { loginUser } from '@api/auth'
import Login from '@pages/Login'

export default function LoginRoot() {
  const handleSubmit = async (username: string, password: string) => {
    try {
      await loginUser(username, password)
      return true
    } catch {
      return false
    }
  }

  return <Login onSubmit={async (data) => handleSubmit(data.username, data.password)} />
}
