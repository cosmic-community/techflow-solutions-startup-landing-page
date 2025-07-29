import { getStartupInfo, getUpdates } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import UpdatesSection from '@/components/UpdatesSection'
import EmailSignupSection from '@/components/EmailSignupSection'

export default async function HomePage() {
  // Fetch data server-side
  const [startupInfo, updates] = await Promise.all([
    getStartupInfo(),
    getUpdates()
  ])

  const emailCtaText = startupInfo?.metadata.email_cta_text

  return (
    <main>
      <HeroSection startupInfo={startupInfo} />
      <UpdatesSection updates={updates} />
      <EmailSignupSection ctaText={emailCtaText} />
    </main>
  )
}