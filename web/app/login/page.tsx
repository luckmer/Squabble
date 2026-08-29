'use client'
import Login from '@pages/Login'

export default function LoginRoot() {
  return (
    <Login
      onSubmit={(data) => {
        console.log(data)
      }}
    />
  )
}
