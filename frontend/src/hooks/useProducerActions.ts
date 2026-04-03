import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { parseApiError } from '../lib/apiError';
import { ProducerApi } from '../api/generated';
import { apiConfig } from '../api/config';

const producerApi = new ProducerApi(apiConfig);

export function useAddMessages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { count: number; payloadSizeBytes?: number }) => {
      await producerApi.createProducerGeneration({
        producerGenerationRequest: payload
      });
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
