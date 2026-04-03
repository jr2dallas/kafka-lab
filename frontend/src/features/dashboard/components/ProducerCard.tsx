import { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Stat } from '../../../components/ui/Stat';
import { useAddMessages } from '../../../hooks/useProducerActions';
import { formatNumber } from '../../../lib/format';
import type { DashboardStatusResponse } from '../../../api/generated';

type ProducerCardProps = {
  data?: DashboardStatusResponse;
};

export function ProducerCard({ data }: ProducerCardProps) {
  const addMessages = useAddMessages();
  const [messageCount, setMessageCount] = useState(1000);
  const [payloadSizeBytes, setPayloadSizeBytes] = useState(128);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await addMessages.mutateAsync({ count: messageCount, payloadSizeBytes });
  };

  return (
    <Card>
      <div className="card-header">
        <h2>Producer</h2>
        <Badge tone={data?.producer.running ? 'success' : 'neutral'}>
          {data?.producer.running ? 'Running' : 'Idle'}
        </Badge>
      </div>

      <form className="form-stack" onSubmit={onSubmit}>
        <label>
          <span>Messages</span>
          <input type="number" value={messageCount} min={1} onChange={(e) => setMessageCount(Number(e.target.value))} />
        </label>
        <label>
          <span>Payload bytes</span>
          <input type="number" value={payloadSizeBytes} min={1} onChange={(e) => setPayloadSizeBytes(Number(e.target.value))} />
        </label>
        <Button type="submit" disabled={addMessages.isPending}>
          {addMessages.isPending ? 'Submitting…' : 'Add messages'}
        </Button>
      </form>

      <div className="stats-grid">
        <Stat label="Target" value={formatNumber(data?.producer.targetCount)} />
        <Stat label="Produced" value={formatNumber(data?.producer.producedCount)} />
        <Stat label="Payload" value={formatNumber(data?.producer.payloadSizeBytes)} />
      </div>
    </Card>
  );
}
