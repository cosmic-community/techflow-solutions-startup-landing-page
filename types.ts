// Cosmic CMS Object Types
export interface StartupInfo {
  id: string
  title: string
  slug: string
  metadata: {
    company_name: string
    tagline: string
    description: string
    hero_image?: {
      url: string
      imgix_url: string
    }
    email_cta_text: string
  }
}

export interface Update {
  id: string
  title: string
  slug: string
  created_at: string
  metadata: {
    title: string
    content: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    update_type: {
      key: string
      value: string
    }
  }
}

export interface EmailSubscriber {
  id: string
  title: string
  slug: string
  metadata: {
    email: string
    first_name: string
    signup_date: string
    source: {
      key: string
      value: string
    }
  }
}

// Component Props Interfaces
export interface EmailSignupProps {
  ctaText?: string
  inline?: boolean
}

export interface HeroSectionProps {
  startupInfo?: StartupInfo
}

export interface UpdatesProps {
  updates: Update[]
}

// API Response Types
export interface SubscriptionResponse {
  success: boolean
  message: string
  subscriber?: EmailSubscriber
  error?: string
}

// Form Data Types
export interface EmailSubscriptionData {
  email: string
  firstName?: string
  source: string
}