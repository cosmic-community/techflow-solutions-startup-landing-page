// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Startup Info object type
interface StartupInfo extends CosmicObject {
  type: 'startup-info';
  metadata: {
    company_name: string;
    tagline?: string;
    description?: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    email_cta_text?: string;
  };
}

// Update object type
interface Update extends CosmicObject {
  type: 'updates';
  metadata: {
    title: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    update_type?: {
      key: UpdateType;
      value: string;
    };
  };
}

// Email Subscriber object type
interface EmailSubscriber extends CosmicObject {
  type: 'email-subscribers';
  metadata: {
    email: string;
    first_name?: string;
    signup_date?: string;
    source?: {
      key: SourceType;
      value: string;
    };
  };
}

// Type literals for select-dropdown values
type UpdateType = 'product' | 'milestone' | 'news';
type SourceType = 'website' | 'social' | 'referral';

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Form types
interface EmailSignupForm {
  email: string;
  firstName?: string;
}

// Component prop types
interface HeroSectionProps {
  startupInfo: StartupInfo | null;
}

interface UpdatesProps {
  updates: Update[];
}

interface EmailSignupProps {
  ctaText?: string;
  onSignupSuccess?: () => void;
}

// Type guards
function isStartupInfo(obj: CosmicObject): obj is StartupInfo {
  return obj.type === 'startup-info';
}

function isUpdate(obj: CosmicObject): obj is Update {
  return obj.type === 'updates';
}

function isEmailSubscriber(obj: CosmicObject): obj is EmailSubscriber {
  return obj.type === 'email-subscribers';
}

// Export all types
export type {
  CosmicObject,
  StartupInfo,
  Update,
  EmailSubscriber,
  UpdateType,
  SourceType,
  CosmicResponse,
  EmailSignupForm,
  HeroSectionProps,
  UpdatesProps,
  EmailSignupProps,
};

export { isStartupInfo, isUpdate, isEmailSubscriber };