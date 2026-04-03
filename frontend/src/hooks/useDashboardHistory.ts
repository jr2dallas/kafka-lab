import { useEffect, useMemo, useRef, useState } from 'react';
import { useDashboardStatus } from './useDashboardStatus';
import type { DashboardStatusResponse } from '../api/generated';

const WINDOW_SIZE = 60;

export type ChartPoint = {
  index: number;
  timeLabel: string;
  timestamp: string | null;
  lag: number | null;
  produced: number | null;
  consumed: number | null;
};

function formatRelativeLabel(position: number) {
  const offset = position - (WINDOW_SIZE - 1);
  return offset === 0 ? 'now' : `${offset}s`;
}

export function useDashboardHistory() {
  const statusQuery = useDashboardStatus();
  const [history, setHistory] = useState<DashboardStatusResponse[]>([]);
  const sampleIndexRef = useRef(0);

  useEffect(() => {
    if (!statusQuery.data) {
      return;
    }

    sampleIndexRef.current += 1;

    setHistory((prev) => {
      const next = [...prev, statusQuery.data!];
      return next.slice(-WINDOW_SIZE);
    });
  }, [statusQuery.data]);

  const chartPoints = useMemo<ChartPoint[]>(() => {
    const placeholdersCount = Math.max(0, WINDOW_SIZE - history.length);

    const placeholders: ChartPoint[] = Array.from(
        { length: placeholdersCount },
        (_, index) => ({
          index,
          timeLabel: formatRelativeLabel(index),
          timestamp: null,
          lag: null,
          produced: null,
          consumed: null
        })
    );

    const realPoints: ChartPoint[] = history.map((item, index) => ({
      index: placeholdersCount + index,
      timeLabel: formatRelativeLabel(placeholdersCount + index),
      timestamp: item.timestamp,
      lag: item.lag.totalLag,
      produced: item.rates.producedPerSecond,
      consumed: item.rates.consumedPerSecond
    }));

    return [...placeholders, ...realPoints];
  }, [history]);

  return {
    ...statusQuery,
    history,
    chartPoints
  };
}