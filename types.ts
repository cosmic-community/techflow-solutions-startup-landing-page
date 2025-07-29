// Cosmic CMS types
export interface CosmicObject {
  id: string
  slug: string
  title: string
  metadata: Record<string, any>
}

export interface StartupInfo extends CosmicObject {
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

export interface Update extends CosmicObject {
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

export interface EmailSubscriber extends CosmicObject {
  metadata: {
    email: string
    first_name: string
    signup_date: string
    source: string
  }
}

// Component props
export interface EmailSignupProps {
  ctaText?: string
}