'use client'
import Dashboard from '@pages/Dashboard'
import { userSelector } from '@store/user/selector'

const DashboardRoot = () => {
  const user = userSelector().user

  return <Dashboard user={user} />
}

export default DashboardRoot
