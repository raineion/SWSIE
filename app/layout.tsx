import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'SWSIE Partners Directory',
  description: 'Southwest Sustainability Innovation Engine Partners',
  openGraph: {
    title: 'Southwest Sustainability Innovation Engine',
    description: 'This is the Southwest Sustainability Innovation Engine.',
    url: baseUrl,
    siteName: 'Southwest Sustainability Innovation Engine',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} antialiased w-full mx-auto py-8 pt-28 px-0`}> {/* Added pt-28 for fixed header */}
        <div className="main-container max-w-[1440px] mx-auto px-0"> {/* Remove padding */}
          <div className="content-area">
            <main className="app-container min-w-0 flex flex-col">
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
