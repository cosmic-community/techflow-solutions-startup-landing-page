import { createBucketClient } from '@cosmicjs/sdk'
import { StartupInfo, Update, EmailSubscriber } from '@/types'

// Initialize Cosmic client
const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Get startup info (singleton object)
export async function getStartupInfo(): Promise<StartupInfo | undefined> {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: 'startup-info'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return object as StartupInfo
  } catch (error) {
    // Return undefined instead of null for type consistency
    console.error('Error fetching startup info:', error)
    return undefined
  }
}

// Get all updates
export async function getUpdates(): Promise<Update[]> {
  try {
    const { objects } = await cosmic.objects
      .find({
        type: 'updates'
      })
      .props(['id', 'title', 'slug', 'created_at', 'metadata'])
      .depth(1)
      .limit(10)
    
    return objects as Update[]
  } catch (error) {
    console.error('Error fetching updates:', error)
    return []
  }
}

// Create email subscriber
export async function createEmailSubscriber(data: {
  email: string
  firstName?: string
  source: string
}): Promise<EmailSubscriber> {
  const subscriber = await cosmic.objects.insertOne({
    title: data.email,
    type: 'email-subscribers',
    metadata: {
      email: data.email,
      first_name: data.firstName || '',
      signup_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      source: data.source
    }
  })
  
  return subscriber.object as EmailSubscriber
}