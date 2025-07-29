import { createBucketClient } from '@cosmicjs/sdk'
import type { StartupInfo, Update, EmailSubscriber } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Type guard for Cosmic errors
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch startup information
export async function getStartupInfo(): Promise<StartupInfo | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: 'startup-info',
        slug: 'techflow-solutions'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return object as StartupInfo
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching startup info:', error)
    throw new Error('Failed to fetch startup info')
  }
}

// Fetch all company updates
export async function getUpdates(): Promise<Update[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'updates' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
      .limit(10)
    return objects as Update[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching updates:', error)
    throw new Error('Failed to fetch updates')
  }
}

// Create a new email subscriber
export async function createEmailSubscriber(
  email: string, 
  firstName?: string,
  source: string = 'website'
): Promise<EmailSubscriber> {
  try {
    const { object } = await cosmic.objects.insertOne({
      type: 'email-subscribers',
      title: email,
      metadata: {
        email: email.toLowerCase().trim(),
        first_name: firstName?.trim() || '',
        signup_date: new Date().toISOString().split('T')[0],
        source: source
      }
    })
    return object as EmailSubscriber
  } catch (error) {
    console.error('Error creating email subscriber:', error)
    throw new Error('Failed to subscribe email')
  }
}

// Check if email already exists
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const { objects } = await cosmic.objects
      .find({ 
        type: 'email-subscribers',
        'metadata.email': email.toLowerCase().trim()
      })
      .props(['id'])
      .limit(1)
    return objects.length > 0
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return false
    }
    console.error('Error checking email existence:', error)
    throw new Error('Failed to check email existence')
  }
}