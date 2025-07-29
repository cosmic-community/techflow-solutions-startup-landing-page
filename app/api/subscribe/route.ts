import { NextRequest, NextResponse } from 'next/server'
import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, source } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    try {
      const existingSubscriber = await cosmic.objects.find({
        type: 'email-subscribers',
        'metadata.email': email
      }).props(['id'])

      if (existingSubscriber.objects && existingSubscriber.objects.length > 0) {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 409 }
        )
      }
    } catch (error) {
      // If no existing subscriber found, continue with creation
    }

    // Create new subscriber
    const newSubscriber = await cosmic.objects.insertOne({
      title: email,
      type: 'email-subscribers',
      metadata: {
        email,
        first_name: firstName || '',
        signup_date: new Date().toISOString().split('T')[0],
        source: source || 'website'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!',
      subscriber: newSubscriber.object
    })

  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}