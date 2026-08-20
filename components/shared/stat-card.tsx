'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/shared/icon';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: { value: string; up: boolean };
  tone?: 'brand' | 'success' | 'warning' | 'info' | 'danger';
  footer?: string;
}

const toneMap = {
  brand: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400',
  success:
    'bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-400',
  warning:
    'bg-warning-50 text-warning-600 dark:bg-warning-500/10 dark:text-warning-400',
  info: 'bg-info-50 text-info-600 dark:bg-info-500/10 dark:text-info-400',
  danger:
    'bg-danger-50 text-danger-600 dark:bg-danger-500/10 dark:text-danger-400',
};

export function StatCard({
  label,
  value,
  icon,
  trend,
  tone = 'brand',
  footer,
}: StatCardProps) {
  return (
    <Card className="p-5 transition-shadow hover:shadow-elevated">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
        </div>
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl',
            toneMap[tone]
          )}
        >
          <Icon name={icon} className="h-5 w-5" />
        </div>
      </div>
      {(trend || footer) && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          {trend && (
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium',
                trend.up
                  ? 'bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-400'
                  : 'bg-danger-50 text-danger-600 dark:bg-danger-500/10 dark:text-danger-400'
              )}
            >
              <Icon
                name={trend.up ? 'ArrowUpRight' : 'ArrowDownRight'}
                className="h-3 w-3"
              />
              {trend.value}
            </span>
          )}
          {footer && <span className="text-muted-foreground">{footer}</span>}
        </div>
      )}
    </Card>
  );
}
