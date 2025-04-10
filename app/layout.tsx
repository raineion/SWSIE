"use client"

import './global.css';
import { Inter } from 'next/font/google';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { usePathname } from 'next/navigation';
import { siteName } from './sitemap'; // Import siteName

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Function to get title based on pathname
  const getPageTitle = () => {
    const baseName = siteName;
    
    switch (pathname) {
      case '/':
        return `${baseName} - Home`;
      case '/about':
        return `${baseName} - About`;
      case '/partners':
        return `${baseName} - Partners`;
      case '/analytics':
        return `${baseName} - Impact Maps`;
      case '/partnership-benefits':
        return `${baseName} - Partnership Benefits`;
      default:
        return baseName;
    }
  };

  return (
    <html lang="en" className="text-black bg-white">
      <head>
        <title>{getPageTitle()}</title>
        <meta name="description" content="Southwest Sustainability Innovation Engine Partner Directory - Connecting sustainability partners across the Southwest region" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/logos/nsf-logo.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="/logos/nsf-logo.jpg" type="image/jpeg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased w-full`}>
        <AnimatePresence mode="wait">
          <div key={pathname} className="main-container max-w-[1400px] mx-auto">
            <div className="content-area">
              <main className="app-container relative">
                {children}
              </main>
            </div>
          </div>
        </AnimatePresence>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
