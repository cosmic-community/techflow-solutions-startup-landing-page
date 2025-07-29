import { createBucketClient } from '@cosmicjs/sdk'
import type { StartupInfo, Update, EmailSubscriber, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch startup information
export async function getStartupInfo(): Promise<StartupInfo | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'startup-info',
      slug: 'techflow-solutions'
    })
    return response.object as StartupInfo
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch startup info')
  }
}

// Fetch all company updates
export async function getUpdates(): Promise<Update[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'updates' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(10)
    return response.objects as Update[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch updates')
  }
}

// Create a new email subscriber
export async function createEmailSubscriber(
  email: string, 
  firstName?: string
): Promise<EmailSubscriber> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'email-subscribers',
      title: email,
      metadata: {
        email,
        first_name: firstName || '',
        signup_date: new Date().toISOString().split('T')[0],
        source: 'website'
      }
    })
    return response.object as EmailSubscriber
  } catch (error) {
    console.error('Error creating email subscriber:', error)
    throw new Error('Failed to subscribe email')
  }
}

// Check if email already exists
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'email-subscribers',
        'metadata.email': email 
      })
      .limit(1)
    return response.objects.length > 0
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return false
    }
    throw new Error('Failed to check email existence')
  }
}