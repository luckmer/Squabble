import '@styles/import.css'
import '@styles/tailwind.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'

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

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' className={` ${generalSans.variable} h-full antialiased`}>
      <body className='flex flex-col'>{children}</body>
    </html>
  )
}
