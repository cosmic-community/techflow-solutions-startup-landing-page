import type { UpdatesProps } from '@/types'

export default function UpdatesSection({ updates }: UpdatesProps) {
  if (!updates || updates.length === 0) {
    return null
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getUpdateTypeColor = (type: string): string => {
    switch (type) {
      case 'product':
        return 'bg-blue-100 text-blue-800'
      case 'milestone':
        return 'bg-green-100 text-green-800'
      case 'news':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Latest Updates
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay up to date with our journey, product developments, and company milestones.
            </p>
          </div>
          
          <div className="space-y-8">
            {updates.map((update, index) => (
              <article 
                key={update.id}
                className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors duration-200 overflow-hidden animate-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="md:flex">
                  {/* Featured Image */}
                  {update.metadata.featured_image && (
                    <div className="md:w-1/3">
                      <img
                        src={`${update.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                        alt={update.metadata.title}
                        className="w-full h-48 md:h-full object-cover"
                        width={400}
                        height={300}
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className={`p-8 ${update.metadata.featured_image ? 'md:w-2/3' : 'w-full'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUpdateTypeColor(update.metadata.update_type.key)}`}>
                        {update.metadata.update_type.value}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(update.created_at)}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {update.metadata.title}
                    </h3>
                    
                    <div 
                      className="text-gray-700 leading-relaxed prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: update.metadata.content }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}