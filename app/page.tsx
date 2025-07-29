import { getStartupInfo, getUpdates } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import UpdatesSection from '@/components/UpdatesSection'
import EmailSignupSection from '@/components/EmailSignupSection'

export default async function HomePage() {
  // Fetch data on the server
  const [startupInfoResult, updates] = await Promise.all([
    getStartupInfo(),
    getUpdates()
  ])

  // Convert null to undefined to match component expectations
  const startupInfo = startupInfoResult || undefined

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection startupInfo={startupInfo} />
      
      {/* Updates Section */}
      {updates.length > 0 && (
        <UpdatesSection updates={updates} />
      )}
      
      {/* Email Signup Section */}
      <EmailSignupSection 
        ctaText={startupInfo?.metadata?.email_cta_text} 
      />
    </main>
  )
}