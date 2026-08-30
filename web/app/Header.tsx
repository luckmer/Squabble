'use client'
import Header from '@pages/Header'
import { usePathname } from 'next/navigation'

const HeaderRoot = () => {
  const pathname = usePathname()
  return <Header pathname={pathname} />
}

export default HeaderRoot
