'use client'
import Profile from '@pages/Profile'
import { userSelector } from '@store/user/selector'

const ProfileRoot = () => {
  const user = userSelector().user
  return <Profile user={user} />
}

export default ProfileRoot
