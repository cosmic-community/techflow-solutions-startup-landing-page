import type { UpdatesProps, Update } from '@/types'
import { Calendar, ArrowRight } from 'lucide-react'

export default function UpdatesSection({ updates }: UpdatesProps) {
  const getUpdateTypeColor = (type?: string) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16 animate-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest Updates
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay up to date with our latest product developments, company milestones, and exciting news.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {updates.map((update: Update, index: number) => (
            <article 
              key={update.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Featured image */}
              {update.metadata.featured_image && (
                <div className="mb-6">
                  <img
                    src={`${update.metadata.featured_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
                    alt={update.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              
              {/* Update type badge */}
              {update.metadata.update_type && (
                <div className="mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getUpdateTypeColor(update.metadata.update_type.key)}`}>
                    {update.metadata.update_type.value}
                  </span>
                </div>
              )}
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {update.title}
              </h3>
              
              {/* Content excerpt */}
              {update.metadata.content && (
                <div 
                  className="text-gray-600 mb-4 prose prose-sm max-w-none line-clamp-3"
                  dangerouslySetInnerHTML={{ 
                    __html: update.metadata.content.substring(0, 200) + '...' 
                  }}
                />
              )}
              
              {/* Date */}
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                <time dateTime={update.created_at}>
                  {formatDate(update.created_at)}
                </time>
              </div>
              
              {/* Read more link */}
              <button className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors">
                Read more
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}