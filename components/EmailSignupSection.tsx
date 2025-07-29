import type { EmailSignupProps } from '@/types'
import EmailSignup from '@/components/EmailSignup'

export default function EmailSignupSection({ ctaText }: EmailSignupProps) {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center animate-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {ctaText || 'Stay in the Loop'}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be the first to know about new features, product updates, and exclusive early access opportunities.
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <EmailSignup />
            
            <p className="text-sm text-gray-500 mt-4">
              No spam, ever. Unsubscribe at any time.
            </p>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 grid grid-cols-3 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Teams signed up</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">$2M</div>
              <div className="text-sm text-gray-600">Seed funding raised</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">2024</div>
              <div className="text-sm text-gray-600">Beta launching</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}