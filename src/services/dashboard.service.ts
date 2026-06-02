import { dashboardRepository } from '@/repositories/dashboard.repository';

export const dashboardService = {
  getIncidents: async () => {
    // We can add business logic here (e.g., sorting, filtering, data transformations)
    const incidents = await dashboardRepository.getIncidents();
    return incidents;
  },

  getKpis: async () => {
    return dashboardRepository.getKpis();
  },

  getMapPoints: async () => {
    return dashboardRepository.getMapPoints();
  },

  getAiInsights: async () => {
    return dashboardRepository.getAiInsights();
  },

  getAnalytics: async () => {
    return dashboardRepository.getAnalytics();
  },
};
