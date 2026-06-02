import { useQuery } from '@tanstack/react-query';
import { firmsService } from '@/services/firms.service';

/**
 * Hook to fetch and cache NASA FIRMS satellite data.
 * @param country The ISO 3166-1 alpha-3 country code (e.g., 'BRA' for Brazil)
 * @param days Number of past days to query (1 to 10)
 */
export const useFirmsData = (country: string = 'BRA', days: number = 1) => {
  return useQuery({
    queryKey: ['firms-wildfires', country, days],
    queryFn: () => firmsService.getWildfireData(country, days),
    // FIRMS NRT data updates relatively slowly, so caching for 10-15 minutes is safe
    refetchInterval: 15 * 60 * 1000, 
    staleTime: 10 * 60 * 1000,
    // Do not run the query if the API key is not configured
    enabled: !!process.env.NEXT_PUBLIC_FIRMS_MAP_KEY,
  });
};
