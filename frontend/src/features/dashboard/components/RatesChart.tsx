import { useMemo, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { Card } from '../../../components/ui/Card';
import type { ChartPoint } from '../../../hooks/useDashboardHistory';

type RatesChartProps = {
  chartPoints: ChartPoint[];
};

export function RatesChart({ chartPoints }: RatesChartProps) {
  const yMaxRef = useRef(10);

  const producedValues = chartPoints
    .map((point) => point.produced)
    .filter((value): value is number => value !== null);

  const consumedValues = chartPoints
    .map((point) => point.consumed)
    .filter((value): value is number => value !== null);

  const windowMax = Math.max(0, ...producedValues, ...consumedValues);
  const targetMax = Math.max(10, Math.ceil(windowMax * 1.15));

  if (targetMax > yMaxRef.current) {
    yMaxRef.current = targetMax;
  } else {
    yMaxRef.current = Math.max(targetMax, Math.ceil(yMaxRef.current * 0.98));
  }

  const option = useMemo(() => ({
    animation: false,
    // animationDurationUpdate: 180,
    // animationEasingUpdate: 'linear',
    grid: {
      left: 16,
      right: 16,
      top: 42,
      bottom: 28,
      containLabel: true
    },
    legend: {
      top: 8,
      textStyle: {
        color: '#cbd5e1'
      }
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
      max: yMaxRef.current,
      axisLabel: {
        color: '#8ba0ba'
      },
      splitLine: {
        lineStyle: { color: 'rgba(148, 163, 184, 0.14)' }
      }
    },
    series: [
      {
        name: 'Produced',
        type: 'line',
        smooth: true,
        symbol: 'none',
        connectNulls: false,
        lineStyle: {
          width: 3,
          color: '#60a5fa'
        },
        data: chartPoints.map((point) => point.produced ?? '-')
      },
      {
        name: 'Consumed',
        type: 'line',
        smooth: true,
        symbol: 'none',
        connectNulls: false,
        lineStyle: {
          width: 3,
          color: '#f87171'
        },
        data: chartPoints.map((point) => point.consumed ?? '-')
      }
    ]
  }), [chartPoints]);

  return (
    <Card>
      <div className="card-header">
        <h2>Rates</h2>
        <p>Produced versus consumed per second.</p>
      </div>
      <div className="chart-box chart-box-echarts">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </Card>
  );
}
