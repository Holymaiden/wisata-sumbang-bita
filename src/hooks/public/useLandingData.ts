import { createQuery } from 'react-query-kit';
import type { LandingPageData } from '@/types/public';

export const useLandingData = createQuery<LandingPageData>({
  queryKey: ['landing-page'],
  fetcher: async (): Promise<LandingPageData> => {
    const response = await fetch('/api/public/landing');

    if (!response.ok) {
      throw new Error('Failed to fetch landing page data');
    }

    return response.json();
  },
  staleTime: 5 * 60 * 1000, // 5 minutes
});
