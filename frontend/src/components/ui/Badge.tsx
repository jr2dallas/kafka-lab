import type { PropsWithChildren } from 'react';
import { cn } from '../../lib/cn';

export function Badge({ children, tone = 'neutral' }: PropsWithChildren<{ tone?: 'neutral' | 'success' | 'danger' }>) {
  return <span className={cn('badge', `badge-${tone}`)}>{children}</span>;
}
