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

export interface CosmicObject {
  id: string
  title: string
  slug: string
  created_at: string
  modified_at: string
  status: string
  metadata: Record<string, any>
}

// Component Props Interfaces
export interface HeroSectionProps {
  startupInfo: StartupInfo
}

export interface UpdatesProps {
  updates: Update[]
}

export interface EmailSignupProps {
  ctaText: string
}