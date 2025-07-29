import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'TechFlow Solutions - Streamlining workflows for modern teams',
  description: 'We\'re building the next generation of productivity tools to help teams work smarter, not harder. Join thousands of teams already transforming how they work.',
  keywords: 'productivity, workflow, automation, team collaboration, AI-powered',
  authors: [{ name: 'TechFlow Solutions' }],
  creator: 'TechFlow Solutions',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://techflow.solutions',
    title: 'TechFlow Solutions - Streamlining workflows for modern teams',
    description: 'We\'re building the next generation of productivity tools to help teams work smarter, not harder.',
    siteName: 'TechFlow Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechFlow Solutions - Streamlining workflows for modern teams',
    description: 'We\'re building the next generation of productivity tools to help teams work smarter, not harder.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}