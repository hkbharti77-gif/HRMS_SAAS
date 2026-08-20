'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { AreaTrend } from '@/components/shared/charts';
import { goals, employees } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

const perfTrend = [
  { month: 'Feb', value: 72 }, { month: 'Mar', value: 75 }, { month: 'Apr', value: 73 },
  { month: 'May', value: 78 }, { month: 'Jun', value: 80 }, { month: 'Jul', value: 82 },
];

export default function HrManagerPerformancePage() {
  const onTrack = goals.filter((g) => g.status === 'On Track').length;
  const atRisk = goals.filter((g) => g.status === 'At Risk').length;
  const avgProgress = Math.round(goals.reduce((s, g) => s + g.progress, 0) / goals.length);
  const topPerformers = employees.slice(0, 6);

  return (
    <div>
      <PageHeader title="Performance" description="Track goals, review cycles, and team performance across the company." breadcrumbs={[{ label: 'HR Manager', href: '/hr-manager/dashboard' }, { label: 'Performance' }]} />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Avg performance" value="82%" icon="TrendingUp" tone="brand" footer="+4% vs last quarter" />
        <StatCard label="Goals on track" value={onTrack} icon="Target" tone="success" footer={`of ${goals.length}`} />
        <StatCard label="At risk" value={atRisk} icon="AlertTriangle" tone="warning" />
        <StatCard label="Reviews due" value="8" icon="Repeat" tone="info" footer="this quarter" />
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-4"><CardTitle className="text-base">Company Performance Trend</CardTitle></CardHeader>
        <CardContent><AreaTrend data={perfTrend} xKey="month" yKey="value" color="#2563eb" /></CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Company Goals / OKRs</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {goals.map((g) => (
              <div key={g.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{g.title}</p>
                  <StatusBadge status={g.status} dot />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Owner: {g.owner}</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs"><span className="text-muted-foreground">{g.keyResults.filter((k) => k.done).length}/{g.keyResults.length} key results</span><span className="font-medium">{g.progress}%</span></div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${g.progress >= 70 ? 'bg-success-500' : g.progress >= 40 ? 'bg-brand-500' : 'bg-warning-500'}`} style={{ width: `${g.progress}%` }} /></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Top Performers</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {topPerformers.map((e, i) => (
              <div key={e.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-600 dark:bg-brand-500/10">{i + 1}</span>
                  <AvatarBadge name={`${e.firstName} ${e.lastName}`} size="sm" />
                  <div><p className="text-sm font-medium">{e.firstName} {e.lastName}</p><p className="text-xs text-muted-foreground">{e.designation}</p></div>
                </div>
                <span className="text-sm font-semibold text-success-600">{95 - i * 2}%</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
