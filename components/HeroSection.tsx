import type { HeroSectionProps } from '@/types'
import EmailSignup from '@/components/EmailSignup'

export default function HeroSection({ startupInfo }: HeroSectionProps) {
  const heroImage = startupInfo?.metadata.hero_image?.imgix_url
  const companyName = startupInfo?.metadata.company_name || 'TechFlow Solutions'
  const tagline = startupInfo?.metadata.tagline || 'Streamlining workflows for modern teams'
  const description = startupInfo?.metadata.description || 'Building the next generation of productivity tools'
  const ctaText = startupInfo?.metadata.email_cta_text || 'Be the first to know when we launch!'

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {companyName}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 font-medium">
              {tagline}
            </p>
            
            {/* Description with HTML content */}
            <div 
              className="text-lg text-gray-700 mb-10 max-w-xl mx-auto lg:mx-0"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            
            {/* Email signup */}
            <div className="mb-8">
              <p className="text-lg font-medium text-gray-900 mb-4">
                {ctaText}
              </p>
              <EmailSignup inline={true} />
            </div>
            
            {/* Social proof */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>500+ teams signed up</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>$2M seed funding</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>2024 beta launch</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="flex justify-center lg:justify-end animate-in">
            <div className="relative">
              {heroImage && (
                <img
                  src={`${heroImage}?w=1200&h=800&fit=crop&auto=format,compress`}
                  alt={`${companyName} hero`}
                  className="rounded-2xl shadow-2xl max-w-full h-auto"
                  width={600}
                  height={400}
                />
              )}
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500 rounded-full opacity-10 animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}