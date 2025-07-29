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

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    try {
      const { objects } = await cosmic.objects
        .find({
          type: 'email-subscribers',
          'metadata.email': email.toLowerCase().trim()
        })
        .props(['id'])
        .limit(1)

      if (objects && objects.length > 0) {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 409 }
        )
      }
    } catch (checkError) {
      // If 404, continue with creation (no existing subscribers)
      if (!(checkError as any)?.status || (checkError as any).status !== 404) {
        console.error('Error checking existing subscriber:', checkError)
        return NextResponse.json(
          { error: 'Unable to process subscription. Please try again.' },
          { status: 500 }
        )
      }
    }

    // Create new subscriber
    const currentDate = new Date().toISOString().split('T')[0]
    const cleanEmail = email.toLowerCase().trim()
    
    const { object } = await cosmic.objects.insertOne({
      title: cleanEmail,
      type: 'email-subscribers',
      metadata: {
        email: cleanEmail,
        first_name: firstName?.trim() || '',
        signup_date: currentDate,
        source: source || 'website'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! We\'ll be in touch soon.',
      subscriber: object
    }, { status: 201 })

  } catch (error) {
    console.error('Subscription error:', error)
    
    // Handle specific Cosmic errors
    if ((error as any)?.message?.includes('validation')) {
      return NextResponse.json(
        { error: 'Invalid email format. Please check and try again.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Unable to process subscription. Please try again later.' },
      { status: 500 }
    )
  }
}