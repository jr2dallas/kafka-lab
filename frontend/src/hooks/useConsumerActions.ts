import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ConsumerApi } from '../api/generated';
import { apiConfig } from '../api/config';
import {parseApiError} from "../lib/apiError";

const consumerApi = new ConsumerApi(apiConfig);

export function usePauseConsumer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await consumerApi.pauseConsumer();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-status'] });
    },
    onError: async (error) => {
      const message = await parseApiError(error);
      toast.error(message);
    }
  });
}

export function useResumeConsumer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await consumerApi.resumeConsumer();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-status'] });
    },
    onError: async (error) => {
      const message = await parseApiError(error);
      toast.error(message);
    }
  });
}
