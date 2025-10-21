import { BaseEntity } from './index';

export interface Attraction extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  category: string;
  difficulty: 'MUDAH' | 'SEDANG' | 'MENANTANG';
  duration: string;
  ticketPrice: number;
  ticketPriceChild?: number;
  location?: string;
  coordinates?: string;
  bestTime?: string;
  facilities?: string;
  tips?: string;
  featured: boolean;
  isActive: boolean;
  rating: number;
  images?: AttractionImage[];
  features?: AttractionFeature[];
}

export interface AttractionImage {
  id?: string;
  url: string;
  alt?: string;
  caption?: string;
  isPrimary: boolean;
  order: number;
}

export interface AttractionFeature {
  id?: string;
  name: string;
  icon?: string;
  description?: string;
}

export interface AttractionFormData {
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  category: string;
  difficulty: 'MUDAH' | 'SEDANG' | 'MENANTANG';
  duration: string;
  ticketPrice: number;
  ticketPriceChild?: number;
  location?: string;
  coordinates?: string;
  bestTime?: string;
  facilities?: string;
  tips?: string;
  featured: boolean;
  isActive: boolean;
  images?: AttractionImage[];
  features?: AttractionFeature[];
}

export interface GalleryImage extends BaseEntity {
  title: string;
  description?: string;
  url: string;
  alt?: string;
  category: string;
  tags?: string;
  isActive: boolean;
  featured: boolean;
  order: number;
  viewCount: number;
}

export interface GalleryFormData {
  title: string;
  description?: string;
  url: string;
  alt?: string;
  category: string;
  tags?: string;
  isActive: boolean;
  featured: boolean;
  order: number;
}

export interface Review extends BaseEntity {
  name: string;
  email: string;
  rating: number;
  comment: string;
  attractionId?: string;
  attractionTitle?: string;
  isApproved: boolean;
  isVisible: boolean;
}

export interface ReviewFormData {
  name: string;
  email: string;
  rating: number;
  comment: string;
  attractionId?: string;
  isApproved: boolean;
  isVisible: boolean;
}

export interface Booking extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  attractionId?: string;
  attractionTitle?: string;
  visitDate: string;
  guestCount: number;
  totalAmount: number;
  status: 'PENDING' | 'CONTACTED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  message?: string;
  adminNotes?: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  attractionId?: string;
  visitDate: string;
  guestCount: number;
  totalAmount: number;
  status: 'PENDING' | 'CONTACTED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  message?: string;
  adminNotes?: string;
}

export interface Contact extends BaseEntity {
  type: 'PHONE' | 'EMAIL' | 'ADDRESS' | 'SOCIAL_MEDIA' | 'OTHER';
  label: string;
  value: string;
  description?: string;
  isPublic: boolean;
  order: number;
}

export interface ContactFormData {
  type: 'PHONE' | 'EMAIL' | 'ADDRESS' | 'SOCIAL_MEDIA' | 'OTHER';
  label: string;
  value: string;
  description?: string;
  isPublic: boolean;
  order: number;
}

export interface Setting extends BaseEntity {
  key: string;
  value: string;
  type: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'JSON' | 'IMAGE';
  category: string;
  description?: string;
  isPublic: boolean;
}

export interface SettingFormData {
  key: string;
  value: string;
  type: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'JSON' | 'IMAGE';
  category: string;
  description?: string;
  isPublic: boolean;
}

export const ATTRACTION_CATEGORIES = [
  'WISATA_ALAM',
  'WISATA_BUDAYA',
  'WISATA_RELIGI',
  'WISATA_KULINER',
  'WISATA_PETUALANGAN',
  'WISATA_EDUKASI',
];

export const GALLERY_CATEGORIES = [
  'ATTRACTIONS',
  'NATURE',
  'ACTIVITIES',
  'CULTURE',
  'FOOD',
  'EVENTS',
];

export const CONTACT_TYPES = [
  'PHONE',
  'EMAIL',
  'ADDRESS',
  'SOCIAL_MEDIA',
  'OTHER',
];

export const BOOKING_STATUSES = [
  'PENDING',
  'CONTACTED',
  'CONFIRMED',
  'CANCELLED',
  'COMPLETED',
];

export const SETTING_TYPES = ['TEXT', 'NUMBER', 'BOOLEAN', 'JSON', 'IMAGE'];

export const SETTING_CATEGORIES = [
  'general',
  'hero',
  'about',
  'gallery',
  'footer',
  'contact',
  'social',
  'seo',
  'appearance',
  'booking',
  'notification',
  'advanced',
];
