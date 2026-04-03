import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../../lib/cn';

export function Button({ children, className, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }>) {
  return (
    <button className={cn('button', className)} {...props}>
      {children}
    </button>
  );
}
