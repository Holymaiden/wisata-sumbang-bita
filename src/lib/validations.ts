import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const adminSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['ADMIN', 'SUPER_ADMIN']).default('ADMIN'),
});

export const attractionImageSchema = z.object({
  id: z.string().optional(),
  url: z.string().url('Invalid image URL'),
  alt: z.string().optional(),
  caption: z.string().optional(),
  isPrimary: z.boolean().default(false),
  order: z.number().default(0),
});

export const attractionFeatureSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Feature name is required'),
  icon: z.string().optional(),
  description: z.string().optional(),
});

export const attractionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  fullDescription: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  difficulty: z.enum(['MUDAH', 'SEDANG', 'MENANTANG']),
  duration: z.string().min(1, 'Duration is required'),
  rating: z.number().min(0).max(5).default(0),
  ticketPrice: z.number().min(0).default(0),
  ticketPriceChild: z.number().min(0).optional(),
  location: z.string().optional(),
  coordinates: z.string().optional(),
  isActive: z.boolean().default(true),
  featured: z.boolean().default(false),
  bestTime: z.string().optional(),
  facilities: z.string().optional(),
  tips: z.string().optional(),
  images: z.array(attractionImageSchema).optional(),
  features: z.array(attractionFeatureSchema).optional(),
});

export const gallerySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  url: z.string().url('Invalid image URL'),
  alt: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  tags: z.string().optional(),
  isActive: z.boolean().default(true),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

export const contactInfoSchema = z.object({
  type: z.enum(['PHONE', 'EMAIL', 'ADDRESS', 'SOCIAL_MEDIA', 'OTHER']),
  title: z.string().min(1, 'Title is required'),
  value: z.string().min(1, 'Value is required'),
  description: z.string().optional(),
  icon: z.string().optional(),
  isActive: z.boolean().default(true),
  order: z.number().default(0),
});

export const reviewSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').optional(),
  rating: z.number().min(1).max(5),
  title: z.string().optional(),
  content: z.string().min(1, 'Review content is required'),
  attractionId: z.string().optional(),
  isApproved: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export const bookingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  visitDate: z.string().optional(),
  guestCount: z.number().min(1).optional(),
  status: z
    .enum(['PENDING', 'CONTACTED', 'CONFIRMED', 'CANCELLED', 'COMPLETED'])
    .default('PENDING'),
  notes: z.string().optional(),
});

export const siteSettingsSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  value: z.string().min(1, 'Value is required'),
  description: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type AdminFormData = z.infer<typeof adminSchema>;
export type AttractionFormData = z.infer<typeof attractionSchema>;
export type GalleryFormData = z.infer<typeof gallerySchema>;
export type ContactInfoFormData = z.infer<typeof contactInfoSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
export type SiteSettingsFormData = z.infer<typeof siteSettingsSchema>;
