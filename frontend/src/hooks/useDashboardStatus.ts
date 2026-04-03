import { useQuery } from '@tanstack/react-query';
import { DashboardApi } from '../api/generated';
import { apiConfig } from '../api/config';

const dashboardApi = new DashboardApi(apiConfig);

export function useDashboardStatus() {
  return useQuery({
    queryKey: ['dashboard-status'],
    queryFn: async () => {
      const response = await dashboardApi.getDashboardStatus();
      return response.data;
    },
    refetchInterval: 1000,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true
  });
}
