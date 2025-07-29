export interface StartupInfo {
  id: string
  slug: string
  title: string
  metadata: {
    company_name: string
    tagline?: string
    description?: string
    hero_image?: {
      url: string
      imgix_url: string
    }
    email_cta_text?: string
  }
}

export interface Update {
  id: string
  slug: string
  title: string
  metadata: {
    title: string
    content?: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    update_type?: {
      key: string
      value: string
    }
  }
}

export interface EmailSubscriber {
  id: string
  slug: string
  title: string
  metadata: {
    email: string
    first_name?: string
    signup_date?: string
    source?: {
      key: string
      value: string
    }
  }
}

export interface HeroSectionProps {
  startupInfo: StartupInfo | null
}

export interface EmailSignupProps {
  ctaText?: string
}

export interface UpdatesSectionProps {
  updates: Update[]
}