# TechFlow Solutions - Startup Landing Page

![TechFlow Solutions Landing Page](https://imgix.cosmicjs.com/945a9cf0-6ca7-11f0-a051-23c10f41277a-photo-1557804506-669a67965ba0-1753812744870.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, conversion-optimized landing page for TechFlow Solutions that showcases your startup's mission and captures email leads from interested users. Built with Next.js 15 and powered by Cosmic CMS for easy content management.

## ✨ Features

- **Compelling Hero Section** - Eye-catching introduction with company tagline and clear value proposition
- **Email Lead Capture** - Strategic email signup forms with validation and success feedback
- **Company Updates Feed** - Showcase milestones, product updates, and company news
- **Responsive Design** - Perfect experience across all devices and screen sizes
- **SEO Optimized** - Proper meta tags and structured data for search engine visibility
- **Fast Performance** - Optimized images and efficient code for quick loading
- **Easy Content Management** - Update content directly through Cosmic CMS
- **Analytics Ready** - Built-in conversion tracking capabilities

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=68890e802dcc7fbc00c94e5f&clone_repository=688910762dcc7fbc00c94e6f)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I want to build a website for my startup and collect emails from interested users."

### Code Generation Prompt

> Build a landing page for my startup and collect emails from interested users.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router for optimal performance
- **TypeScript** - Full type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Cosmic CMS** - Headless CMS for content management
- **React Hook Form** - Efficient form handling with validation
- **Lucide React** - Beautiful, customizable icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with the cloned bucket

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd techflow-landing-page
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Cosmic credentials to `.env.local`:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Cosmic SDK Examples

### Fetching Startup Information
```typescript
import { cosmic } from '@/lib/cosmic'

const getStartupInfo = async () => {
  try {
    const response = await cosmic.objects.findOne({
      type: 'startup-info',
      slug: 'techflow-solutions'
    })
    return response.object
  } catch (error) {
    if (error.status === 404) return null
    throw error
  }
}
```

### Fetching Company Updates
```typescript
const getUpdates = async () => {
  try {
    const response = await cosmic.objects
      .find({ type: 'updates' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(10)
    return response.objects
  } catch (error) {
    if (error.status === 404) return []
    throw error
  }
}
```

### Creating Email Subscribers
```typescript
const createSubscriber = async (email: string, firstName?: string) => {
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
  return response.object
}
```

## 🎨 Cosmic CMS Integration

This application integrates with three main content types in your Cosmic bucket:

### Startup Info
- **company_name**: Your startup's name
- **tagline**: Compelling tagline for the hero section
- **description**: Detailed company description with HTML formatting
- **hero_image**: Main hero image for visual impact
- **email_cta_text**: Call-to-action text for email signup

### Updates
- **title**: Update headline
- **content**: Full update content with HTML formatting
- **featured_image**: Visual for each update
- **update_type**: Category (Product Update, Milestone, Company News)

### Email Subscribers
- **email**: Subscriber's email address (required, validated)
- **first_name**: Optional first name
- **signup_date**: Automatic date tracking
- **source**: Lead source tracking (Website, Social Media, Referral)

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with automatic builds on push

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Environment Variables for Production
Set these variables in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->