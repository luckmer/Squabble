'use client'
import { registerUser } from '@api/auth'
import Register from '@pages/Register'

const RegisterRoot = () => {
  const handleSubmit = async (email: string, username: string, password: string) => {
    try {
      await registerUser(email, username, password)
      return { status: true }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.indexOf('409') !== -1) {
          return { status: false, error: 'User with this email or username already exists' }
        }
        return { status: false, error: 'Failed to create account.' }
      }
      return { status: false, error: 'Failed to create account.' }
    }
  }

  return (
    <Register onSubmit={async (data) => handleSubmit(data.email, data.username, data.password)} />
  )
}

export default RegisterRoot
