'use client';

import { useCrud } from './useCrud';
import {
  Attraction,
  AttractionFormData,
  GalleryImage,
  GalleryFormData,
  Review,
  ReviewFormData,
  Booking,
  BookingFormData,
  Contact,
  ContactFormData,
  Setting,
  SettingFormData,
} from '@/types/admin/entities';

export function useAttractions(searchParams: Record<string, string> = {}) {
  return useCrud<Attraction, AttractionFormData>({
    queryKey: ['admin-attractions'],
    endpoint: '/api/admin/attractions',
    searchParams,
  });
}

export function useGallery(searchParams: Record<string, string> = {}) {
  return useCrud<GalleryImage, GalleryFormData>({
    queryKey: ['admin-gallery'],
    endpoint: '/api/admin/gallery',
    searchParams,
  });
}

export function useReviews(searchParams: Record<string, string> = {}) {
  return useCrud<Review, ReviewFormData>({
    queryKey: ['admin-reviews'],
    endpoint: '/api/admin/reviews',
    searchParams,
  });
}

export function useBookings(searchParams: Record<string, string> = {}) {
  return useCrud<Booking, BookingFormData>({
    queryKey: ['admin-bookings'],
    endpoint: '/api/admin/bookings',
    searchParams,
  });
}

export function useContacts(searchParams: Record<string, string> = {}) {
  return useCrud<Contact, ContactFormData>({
    queryKey: ['admin-contacts'],
    endpoint: '/api/admin/contacts',
    searchParams,
  });
}

export function useSettings(searchParams: Record<string, string> = {}) {
  return useCrud<Setting, SettingFormData>({
    queryKey: ['admin-settings'],
    endpoint: '/api/admin/settings',
    searchParams,
  });
}
