import { NextRequest, NextResponse } from 'next/server'
import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging"
})

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, source } = await request.json()

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Basic email validation matching Cosmic CMS regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    const cleanEmail = email.toLowerCase().trim()

    // Check if email already exists
    try {
      const { objects } = await cosmic.objects
        .find({
          type: 'email-subscribers',
          'metadata.email': cleanEmail
        })
        .props(['id'])
        .limit(1)

      if (objects && objects.length > 0) {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 409 }
        )
      }
    } catch (checkError: any) {
      // If 404, continue with creation (no existing subscribers)
      if (!checkError?.status || checkError.status !== 404) {
        console.error('Error checking existing subscriber:', checkError)
        return NextResponse.json(
          { error: 'Unable to process subscription. Please try again.' },
          { status: 500 }
        )
      }
    }

    // Create new subscriber with proper metadata structure matching Cosmic CMS
    const currentDate = new Date().toISOString().split('T')[0]
    
    const subscriberData = {
      title: cleanEmail,
      type: 'email-subscribers',
      metadata: {
        email: cleanEmail,
        first_name: firstName?.trim() || '',
        signup_date: currentDate,
        source: {
          key: source || 'website',
          value: source === 'social' ? 'Social Media' : source === 'referral' ? 'Referral' : 'Website'
        }
      }
    }

    const { object } = await cosmic.objects.insertOne(subscriberData)

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! We\'ll be in touch soon.',
      subscriber: object
    }, { status: 201 })

  } catch (error: any) {
    console.error('Subscription error:', error)
    
    // Handle specific Cosmic errors
    if (error?.message?.includes('validation') || error?.message?.includes('email')) {
      return NextResponse.json(
        { error: 'Invalid email format. Please check and try again.' },
        { status: 400 }
      )
    }

    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Authentication error. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Unable to process subscription. Please try again later.' },
      { status: 500 }
    )
  }
}