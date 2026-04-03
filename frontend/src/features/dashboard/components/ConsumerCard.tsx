import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Stat } from '../../../components/ui/Stat';
import { usePauseConsumer, useResumeConsumer } from '../../../hooks/useConsumerActions';
import { formatNumber } from '../../../lib/format';
import type { DashboardStatusResponse } from '../../../api/generated';

type ConsumerCardProps = {
  data?: DashboardStatusResponse;
};

export function ConsumerCard({ data }: ConsumerCardProps) {
  const pauseConsumer = usePauseConsumer();
  const resumeConsumer = useResumeConsumer();

  return (
    <Card>
      <div className="card-header">
        <h2>Consumer</h2>
        <Badge tone={data?.consumer.running ? 'success' : 'danger'}>
          {data?.consumer.running ? 'Running' : 'Paused'}
        </Badge>
      </div>

      <div className="button-row">
        <Button onClick={() => pauseConsumer.mutate()} disabled={pauseConsumer.isPending || !data?.consumer.running}>
          Pause
        </Button>
        <Button onClick={() => resumeConsumer.mutate()} disabled={resumeConsumer.isPending || !!data?.consumer.running}>
          Resume
        </Button>
      </div>

      <div className="stats-grid">
        <Stat label="Consumed" value={formatNumber(data?.consumer.consumedCount)} />
        <Stat label="Status" value={data?.consumer.running ? 'Running' : 'Paused'} />
      </div>
    </Card>
  );
}
