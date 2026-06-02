import { useQuery } from '@tanstack/react-query';
import { weatherService } from '@/services/weather.service';
import { useEffect, useState } from 'react';

// Default coordinates (e.g., São Paulo) if geolocation fails or is denied
const DEFAULT_LAT = -23.5505;
const DEFAULT_LON = -46.6333;

export const useUserLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocalização não suportada pelo navegador.');
      setLocation({ lat: DEFAULT_LAT, lon: DEFAULT_LON });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
        setLocation({ lat: DEFAULT_LAT, lon: DEFAULT_LON }); // Fallback
      }
    );
  }, []);

  return { location, error };
};

export const useEnvironmentalConditions = () => {
  const { location } = useUserLocation();

  return useQuery({
    queryKey: ['weather', location?.lat, location?.lon],
    queryFn: () => {
      if (!location) throw new Error('Location not available yet');
      return weatherService.getEnvironmentalConditions(location.lat, location.lon);
    },
    enabled: !!location, // Only run the query once we have a location
    refetchInterval: 10 * 60 * 1000, // Refresh every 10 minutes
    staleTime: 5 * 60 * 1000, // 5 minutes stale
  });
};
