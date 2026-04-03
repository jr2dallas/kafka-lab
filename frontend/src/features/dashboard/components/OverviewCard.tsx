import { Card } from '../../../components/ui/Card';
import { Stat } from '../../../components/ui/Stat';
import { formatNumber } from '../../../lib/format';
import type { DashboardStatusResponse } from '../../../api/generated';

type OverviewCardProps = {
  data?: DashboardStatusResponse;
  isLoading: boolean;
};

export function OverviewCard({ data, isLoading }: OverviewCardProps) {
  return (
    <Card>
      <div className="card-header">
        <h2>Overview</h2>
        <p>Current topic, group and lag.</p>
      </div>
      {isLoading || !data ? (
        <div className="empty-state">Loading dashboard…</div>
      ) : (
        <div className="stats-grid">
          <Stat label="Topic" value={data.topic} />
          <Stat label="Group" value={data.consumerGroupId} />
          <Stat label="Lag" value={formatNumber(data.lag.totalLag)} />
        </div>
      )}
    </Card>
  );
}
