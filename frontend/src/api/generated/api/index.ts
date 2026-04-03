import { http } from '../../http';
import type { CreateProducerGenerationRequest, DashboardStatusResponse } from '../model';

export class DashboardApi {
  async getDashboardStatus() {
    const data = (await http.get<DashboardStatusResponse>('/api/dashboard/status')).data;
    return { data };
  }
}

export class ProducerApi {
  async createProducerGeneration(request: CreateProducerGenerationRequest) {
    const data = (await http.post('/api/producer/generations', request)).data;
    return { data };
  }
}

export class ConsumerApi {
  async pauseConsumer() {
    const data = (await http.post('/api/consumer/pause')).data;
    return { data };
  }

  async resumeConsumer() {
    const data = (await http.post('/api/consumer/resume')).data;
    return { data };
  }
}
