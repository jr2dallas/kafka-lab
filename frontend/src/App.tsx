import { Toaster } from 'sonner';
import { OverviewCard } from './features/dashboard/components/OverviewCard';
import { ProducerCard } from './features/dashboard/components/ProducerCard';
import { ConsumerCard } from './features/dashboard/components/ConsumerCard';
import { LagChart } from './features/dashboard/components/LagChart';
import { RatesChart } from './features/dashboard/components/RatesChart';
import { useDashboardHistory } from './hooks/useDashboardHistory';

export default function App() {
  const dashboard = useDashboardHistory();

  return (
      <>
        <Toaster position="top-right" richColors />
        <div className="app-shell">
          <div className="container">
            <header className="page-header">
              <div>
                <div className="eyebrow">Kafka dashboard</div>
                <h1>Kafka Lab</h1>
                <p>Producer, consumer and lag simulation in real time.</p>
              </div>
            </header>

            <section className="top-grid">
              <OverviewCard data={dashboard.data} isLoading={dashboard.isLoading} />
              <ProducerCard data={dashboard.data} />
              <ConsumerCard data={dashboard.data} />
            </section>

            <section className="bottom-grid">
              <LagChart chartPoints={dashboard.chartPoints} />
              <RatesChart chartPoints={dashboard.chartPoints} />
            </section>
          </div>
        </div>
      </>
  );
}
