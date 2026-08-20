'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/shared/icon';
import { useApp } from '@/lib/store';
import { copilotInsights, type CopilotInsight } from '@/lib/copilot';

const priorityConfig: Record<string, { border: string; bg: string; iconBg: string; iconColor: string }> = {
  info: { border: 'border-info-200 dark:border-info-800', bg: 'bg-info-50 dark:bg-info-500/5', iconBg: 'bg-info-100 dark:bg-info-500/15', iconColor: 'text-info-600 dark:text-info-400' },
  warning: { border: 'border-warning-200 dark:border-warning-800', bg: 'bg-warning-50 dark:bg-warning-500/5', iconBg: 'bg-warning-100 dark:bg-warning-500/15', iconColor: 'text-warning-600 dark:text-warning-400' },
  danger: { border: 'border-danger-200 dark:border-danger-800', bg: 'bg-danger-50 dark:bg-danger-500/5', iconBg: 'bg-danger-100 dark:bg-danger-500/15', iconColor: 'text-danger-600 dark:text-danger-400' },
};

export function CopilotInsights() {
  const { role } = useApp();
  const insights = copilotInsights(role);

  if (insights.length === 0) return null;

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Icon name="Sparkles" className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Copilot Insights</h3>
            <p className="text-xs text-muted-foreground">AI-powered recommendations for you</p>
          </div>
        </div>
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1.5 text-[10px] font-bold text-white">{insights.length}</span>
      </div>
      <div className="space-y-2">
        {insights.map((insight) => <InsightCard key={insight.id} insight={insight} />)}
      </div>
    </div>
  );
}

function InsightCard({ insight }: { insight: CopilotInsight }) {
  const config = priorityConfig[insight.priority] ?? priorityConfig.info;
  return (
    <Link href={insight.href} className={cn('flex items-start gap-3 rounded-lg border p-3 transition-all hover:shadow-soft', config.border, config.bg)}>
      <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', config.iconBg, config.iconColor)}>
        <Icon name={insight.icon} className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{insight.title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{insight.description}</p>
      </div>
      <Icon name="ChevronRight" className="mt-1.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
    </Link>
  );
}
