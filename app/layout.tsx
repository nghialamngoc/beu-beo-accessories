import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import Header from '@/components/Header'
import clsx from 'clsx'
import TopNavigation from '@/components/TopNavigation'
import { RouterListener } from '@/components/RouterListener'

import './globals.css'
import '../styles/variables.css'
import Script from 'next/script'

const fontFamily = Roboto_Mono({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={clsx(fontFamily.className)}>
        <Header />
        <TopNavigation />
        {children}
        <RouterListener />

        <div id="fb-root"></div>
        <Script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v19.0"
          nonce="Ad4HCzH1"
        ></Script>
      </body>
    </html>
  )
}
