import {
  createQuery,
  createMutation,
  createInfiniteQuery,
} from 'react-query-kit';

export const useAuth = createQuery({
  queryKey: ['auth'],
  fetcher: async () => {
    const response = await fetch('/api/admin/auth/me');
    if (!response.ok) throw new Error('Not authenticated');
    return response.json();
  },
});

export const useLogin = createMutation({
  mutationFn: async (data: { username: string; password: string }) => {
    const response = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },
});

export const useAttractions = createQuery({
  queryKey: ['attractions'],
  fetcher: async (
    variables: {
      page?: number;
      limit?: number;
      search?: string;
      category?: string;
      difficulty?: string;
      isActive?: boolean;
    } = {}
  ) => {
    const params = new URLSearchParams();
    Object.entries(variables).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, String(value));
      }
    });

    const response = await fetch(`/api/admin/attractions?${params}`);
    if (!response.ok) throw new Error('Failed to fetch attractions');
    return response.json();
  },
});

export const useAttraction = createQuery({
  queryKey: ['attraction'],
  fetcher: async (variables: { id: number }) => {
    const response = await fetch(`/api/admin/attractions/${variables.id}`);
    if (!response.ok) throw new Error('Failed to fetch attraction');
    return response.json();
  },
});

export const useCreateAttraction = createMutation({
  mutationFn: async (data: any) => {
    const response = await fetch('/api/admin/attractions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create attraction');
    return response.json();
  },
});

export const useUpdateAttraction = createMutation({
  mutationFn: async ({ id, data }: { id: number; data: any }) => {
    const response = await fetch(`/api/admin/attractions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update attraction');
    return response.json();
  },
});

export const useDeleteAttraction = createMutation({
  mutationFn: async (id: number) => {
    const response = await fetch(`/api/admin/attractions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete attraction');
    return response.json();
  },
});

export const useGalleryImages = createQuery({
  queryKey: ['gallery-images'],
  fetcher: async (
    variables: {
      page?: number;
      limit?: number;
      search?: string;
      category?: string;
      attractionId?: number;
    } = {}
  ) => {
    const params = new URLSearchParams();
    Object.entries(variables).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, String(value));
      }
    });

    const response = await fetch(`/api/admin/gallery?${params}`);
    if (!response.ok) throw new Error('Failed to fetch gallery images');
    return response.json();
  },
});

export const useCreateGalleryImage = createMutation({
  mutationFn: async (data: any) => {
    const response = await fetch('/api/admin/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create gallery image');
    return response.json();
  },
});

export const useUpdateGalleryImage = createMutation({
  mutationFn: async ({ id, data }: { id: number; data: any }) => {
    const response = await fetch(`/api/admin/gallery/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update gallery image');
    return response.json();
  },
});

export const useDeleteGalleryImage = createMutation({
  mutationFn: async (id: number) => {
    const response = await fetch(`/api/admin/gallery/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete gallery image');
    return response.json();
  },
});

export const useContacts = createQuery({
  queryKey: ['contacts'],
  fetcher: async (
    variables: {
      page?: number;
      limit?: number;
      search?: string;
      status?: string;
    } = {}
  ) => {
    const params = new URLSearchParams();
    Object.entries(variables).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, String(value));
      }
    });

    const response = await fetch(`/api/admin/contacts?${params}`);
    if (!response.ok) throw new Error('Failed to fetch contacts');
    return response.json();
  },
});

export const useUpdateContactStatus = createMutation({
  mutationFn: async ({ id, status }: { id: number; status: string }) => {
    const response = await fetch(`/api/admin/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update contact status');
    return response.json();
  },
});

export const useReviews = createQuery({
  queryKey: ['reviews'],
  fetcher: async (
    variables: {
      page?: number;
      limit?: number;
      search?: string;
      isApproved?: boolean;
      attractionId?: number;
    } = {}
  ) => {
    const params = new URLSearchParams();
    Object.entries(variables).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, String(value));
      }
    });

    const response = await fetch(`/api/admin/reviews?${params}`);
    if (!response.ok) throw new Error('Failed to fetch reviews');
    return response.json();
  },
});

export const useUpdateReviewStatus = createMutation({
  mutationFn: async ({
    id,
    isApproved,
  }: {
    id: number;
    isApproved: boolean;
  }) => {
    const response = await fetch(`/api/admin/reviews/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isApproved }),
    });
    if (!response.ok) throw new Error('Failed to update review status');
    return response.json();
  },
});

export const useBookings = createQuery({
  queryKey: ['bookings'],
  fetcher: async (
    variables: {
      page?: number;
      limit?: number;
      search?: string;
      status?: string;
    } = {}
  ) => {
    const params = new URLSearchParams();
    Object.entries(variables).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, String(value));
      }
    });

    const response = await fetch(`/api/admin/bookings?${params}`);
    if (!response.ok) throw new Error('Failed to fetch bookings');
    return response.json();
  },
});

export const useUpdateBookingStatus = createMutation({
  mutationFn: async ({ id, status }: { id: number; status: string }) => {
    const response = await fetch(`/api/admin/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update booking status');
    return response.json();
  },
});

export const useDashboardStats = createQuery({
  queryKey: ['dashboard-stats'],
  fetcher: async () => {
    const response = await fetch('/api/admin/dashboard/stats');
    if (!response.ok) throw new Error('Failed to fetch dashboard stats');
    return response.json();
  },
});
