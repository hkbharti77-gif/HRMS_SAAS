'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type Tone =
  | 'neutral'
  | 'brand'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'purple';

const toneStyles: Record<Tone, string> = {
  neutral:
    'bg-muted text-muted-foreground ring-muted-foreground/20',
  brand:
    'bg-brand-50 text-brand-700 ring-brand-600/20 dark:bg-brand-500/10 dark:text-brand-300',
  success:
    'bg-success-50 text-success-700 ring-success-600/20 dark:bg-success-500/10 dark:text-success-300',
  warning:
    'bg-warning-50 text-warning-700 ring-warning-600/20 dark:bg-warning-500/10 dark:text-warning-300',
  danger:
    'bg-danger-50 text-danger-700 ring-danger-600/20 dark:bg-danger-500/10 dark:text-danger-300',
  info: 'bg-info-50 text-info-700 ring-info-600/20 dark:bg-info-500/10 dark:text-info-300',
  purple:
    'bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-500/10 dark:text-violet-300',
};

function toneFromStatus(status: string): Tone {
  const s = status.toLowerCase();
  if (['active', 'approved', 'present', 'paid', 'disbursed', 'resolved', 'completed', 'on track', 'hired', 'available', 'confirmed', 'reimbursed'].some((k) => s.includes(k)))
    return 'success';
  if (['pending', 'trial', 'draft', 'screening', 'applied', 'interview', 'on hold', 'in progress', 'probation', 'late', 'at risk'].some((k) => s.includes(k)))
    return 'warning';
  if (['reject', 'suspend', 'absent', 'overdue', 'cancelled', 'behind', 'exited', 'notice', 'retired', 'urgent', 'under repair', 'declined'].some((k) => s.includes(k)))
    return 'danger';
  if (['offer', 'open', 'remote', 'wfh', 'leave', 'low', 'high'].some((k) => s.includes(k)))
    return 'info';
  if (['medium'].some((k) => s.includes(k))) return 'warning';
  return 'neutral';
}

export function StatusBadge({
  status,
  tone,
  className,
  dot = false,
}: {
  status: string;
  tone?: Tone;
  className?: string;
  dot?: boolean;
}) {
  const t = tone ?? toneFromStatus(status);
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset whitespace-nowrap',
        toneStyles[t],
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {status}
    </span>
  );
}
