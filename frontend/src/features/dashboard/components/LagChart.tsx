import ReactECharts from 'echarts-for-react';
import { Card } from '../../../components/ui/Card';
import type { ChartPoint } from '../../../hooks/useDashboardHistory';

type LagChartProps = {
  chartPoints: ChartPoint[];
};

export function LagChart({ chartPoints }: LagChartProps) {
  const option = {
    animation: false,
    // animationDurationUpdate: 220,
    // animationEasingUpdate: 'linear',
    grid: {
      left: 16,
      right: 16,
      top: 20,
      bottom: 28,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: chartPoints.map((_, index) => index),
      axisLabel: {
        color: '#8ba0ba',
        formatter: (value: number) => {
          if (value === 0) return '-59s';
          if (value === 15) return '-45s';
          if (value === 30) return '-30s';
          if (value === 45) return '-15s';
          if (value === 59) return 'now';
          return '';
        }
      },
      axisLine: {
        lineStyle: { color: '#334155' }
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      axisLabel: {
        color: '#8ba0ba'
      },
      splitLine: {
        lineStyle: { color: 'rgba(148, 163, 184, 0.14)' }
      }
    },
    series: [
      {
        name: 'Lag',
        type: 'line',
        smooth: true,
        symbol: 'none',
        connectNulls: false,
        lineStyle: {
          width: 3,
          color: '#2dd4bf'
        },
        areaStyle: {
          color: 'rgba(45, 212, 191, 0.16)'
        },
        data: chartPoints.map((point) => point.lag ?? '-')
      }
    ]
  };

  return (
    <Card>
      <div className="card-header">
        <h2>Lag</h2>
        <p>Last 60 seconds.</p>
      </div>
      <div className="chart-box chart-box-echarts">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </Card>
  );
}
