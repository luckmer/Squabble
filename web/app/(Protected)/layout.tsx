import '@styles/import.css'
import '@styles/tailwind.css'

import { getUserProfile } from '@api/user/server'
import { Store } from '@store/index'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Toaster } from 'sonner'

import Header from '../Header'

const generalSans = localFont({
  src: '../../common/font/Sans/GeneralSans-Variable.ttf',
  variable: '--font-general-sans',
  weight: '100 900',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sguabble',
  description: 'Sguabble',
}

export default async function RootLayout({ children, modals }: LayoutProps<'/'>) {
  const user = await getUserProfile()

  return (
    <html lang='en' className={` ${generalSans.variable} h-full antialiased`}>
      <body className='flex flex-col'>
        <Toaster theme='dark' position='bottom-right' closeButton duration={3000} />
        <Store user={user}>
          <Header user={user} />
          {modals}
          {children}
        </Store>
      </body>
    </html>
  )
}
