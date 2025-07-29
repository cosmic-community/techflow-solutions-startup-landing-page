import { getStartupInfo, getUpdates } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import UpdatesSection from '@/components/UpdatesSection'
import EmailSignupSection from '@/components/EmailSignupSection'

export default async function HomePage() {
  // Fetch data server-side
  const [startupInfoData, updates] = await Promise.all([
    getStartupInfo(),
    getUpdates()
  ])

  // Handle case where startup info might be null
  if (!startupInfoData) {
    return (
      <main>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Loading startup information...</p>
        </div>
      </main>
    )
  }

  const emailCtaText = startupInfoData.metadata.email_cta_text || "Join our newsletter"

  return (
    <main>
      <HeroSection startupInfo={startupInfoData} />
      <UpdatesSection updates={updates} />
      <EmailSignupSection ctaText={emailCtaText} />
    </main>
  )
}