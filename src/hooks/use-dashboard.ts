import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboard.service';

export const useIncidents = () => {
  return useQuery({
    queryKey: ['incidents'],
    queryFn: () => dashboardService.getIncidents(),
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });
};

export const useKpis = () => {
  return useQuery({
    queryKey: ['kpis'],
    queryFn: () => dashboardService.getKpis(),
    refetchInterval: 60000, // Refresh every minute
  });
};

export const useMapPoints = () => {
  return useQuery({
    queryKey: ['map-points'],
    queryFn: () => dashboardService.getMapPoints(),
    refetchInterval: 30000,
  });
};

export const useAiInsights = () => {
  return useQuery({
    queryKey: ['ai-insights'],
    queryFn: () => dashboardService.getAiInsights(),
    refetchInterval: 60000 * 5, // Refresh every 5 minutes
  });
};

export const useAnalytics = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: () => dashboardService.getAnalytics(),
    staleTime: 60000 * 5, // Data is fresh for 5 minutes
  });
};
