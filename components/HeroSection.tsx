import type { HeroSectionProps } from '@/types'
import EmailSignup from '@/components/EmailSignup'

export default function HeroSection({ startupInfo }: HeroSectionProps) {
  if (!startupInfo) {
    return (
      <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container text-center">
          <div className="animate-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to Our Startup
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Building the future of productivity tools
            </p>
            <EmailSignup inline />
          </div>
        </div>
      </section>
    )
  }

  const { company_name, tagline, description, hero_image } = startupInfo.metadata

  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="animate-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              {company_name}
            </h1>
            
            {tagline && (
              <p className="text-xl md:text-2xl text-gray-600 mb-6 font-medium">
                {tagline}
              </p>
            )}
            
            {description && (
              <div 
                className="text-lg text-gray-700 mb-8 prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
            
            {/* Inline email signup */}
            <div className="mb-8">
              <EmailSignup inline />
            </div>
            
            {/* Social proof */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white"></div>
              </div>
              <span>Join 500+ teams already signed up</span>
            </div>
          </div>
          
          {/* Right column - Hero image */}
          {hero_image && (
            <div className="animate-slide-up">
              <div className="relative">
                <img
                  src={`${hero_image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                  alt={`${company_name} hero image`}
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}