// Navigation
export type ViewState =
  | 'branding'
  | 'catalog'
  | 'chat'
  | 'strategy-approval'
  | 'refinement'
  | 'analysis'
  | 'generation'
  | 'calendar';

// Brand Identity
export interface BrandConfig {
  id?: string;
  userId?: string;
  name: string;
  website: string;
  primaryColor: string;
  secondaryColor: string;
  fontHeading: string;
  fontBody: string;
  logo: string;
  manualUrl?: string;
  toneOfVoice?: string;
  socialMedia: {
    instagram: string;
    tiktok: string;
    linkedin: string;
    twitter: string;
  };
}

// Product Catalog
export interface Product {
  id: string;
  brandId?: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  image: string;
  imageNoBg: string;
  visualReferences: string[];
  status: 'Ready' | 'Processing' | 'Syncing' | 'Error';
  tags: string[];
}

// Campaign
export interface Campaign {
  id: string;
  brandId?: string;
  goal: string;
  duration: string;
  status: 'draft' | 'active' | 'completed';
  createdAt?: string;
}

// Strategy
export interface Strategy {
  id: string;
  campaignId?: string;
  name: string;
  type: 'growth' | 'engagement' | 'sales';
  reach: string;
  probability: number;
  tags: string[];
  description: string;
  isSelected?: boolean;
}

// Platform-specific copy
export interface PlatformCopy {
  whatsapp: string;
  meta: string;
  linkedin: string;
  instagram: string;
}

// Content Plan
export interface ContentPlanItem {
  id: string;
  strategyId?: string;
  day: number;
  platform: 'instagram' | 'tiktok' | 'linkedin';
  format: 'Post' | 'Story' | 'Reel';
  intention: string;
  visualDescription: string;
  copyPreview: string;
  copies?: PlatformCopy;
  status?: 'draft' | 'approved' | 'generated';
}

// Generated images
export interface GeneratedImage {
  id: string;
  contentPlanItemId: string;
  imageUrl: string;
  prompt: string;
  status: 'pending' | 'generating' | 'completed' | 'failed';
}

// Calendar Posts
export interface Post {
  id: string;
  contentPlanItemId?: string;
  brandId?: string;
  date: number;
  title: string;
  image: string;
  time: string;
  type: 'Static' | 'Video' | 'Carousel';
  platform: 'instagram' | 'linkedin' | 'tiktok';
  status?: 'draft' | 'scheduled' | 'published';
}

// Chat messages
export interface ChatMessage {
  role: 'ai' | 'user';
  content: string;
}

// User profile
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}
