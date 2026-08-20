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
import { employees, goals } from '@/lib/mock-data';

const teamPerfTrend = [
  { month: 'Feb', value: 72 },
  { month: 'Mar', value: 75 },
  { month: 'Apr', value: 73 },
  { month: 'May', value: 78 },
  { month: 'Jun', value: 80 },
  { month: 'Jul', value: 82 },
];

export default function ManagerPerformancePage() {
  const team = employees.filter((e) => e.manager === 'Sarah Chen');
  const teamGoals = goals.filter((g) => g.ownerType === 'Team' || g.ownerType === 'Individual');

  return (
    <div>
      <PageHeader
        title="Team Performance"
        description="Track goals, review progress, and monitor team performance."
        breadcrumbs={[{ label: 'Manager', href: '/manager/dashboard' }, { label: 'Performance' }]}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Avg performance" value="82%" icon="TrendingUp" tone="brand" footer="+4% vs last quarter" />
        <StatCard label="Goals on track" value={teamGoals.filter((g) => g.status === 'On Track').length} icon="Target" tone="success" footer={`of ${teamGoals.length}`} />
        <StatCard label="At risk" value={teamGoals.filter((g) => g.status === 'At Risk').length} icon="AlertTriangle" tone="warning" />
        <StatCard label="Reviews due" value="3" icon="Repeat" tone="info" footer="this quarter" />
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-4"><CardTitle className="text-base">Team Performance Trend</CardTitle></CardHeader>
        <CardContent>
          <AreaTrend data={teamPerfTrend} xKey="month" yKey="value" color="#2563eb" />
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Team Members</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {team.slice(0, 8).map((m) => (
              <div key={m.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <AvatarBadge name={`${m.firstName} ${m.lastName}`} size="sm" />
                  <div>
                    <p className="text-sm font-medium">{m.firstName} {m.lastName}</p>
                    <p className="text-xs text-muted-foreground">{m.designation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Risk</p>
                    <StatusBadge status={m.attritionRisk ?? 'Low'} dot />
                  </div>
                  <Button variant="ghost" size="sm"><Icon name="Eye" className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Team Goals</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {teamGoals.map((g) => (
              <div key={g.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{g.title}</p>
                  <StatusBadge status={g.status} dot />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Owner: {g.owner}</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{g.keyResults.filter((k) => k.done).length}/{g.keyResults.length} key results</span>
                    <span className="font-medium">{g.progress}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${g.progress >= 70 ? 'bg-success-500' : g.progress >= 40 ? 'bg-brand-500' : 'bg-warning-500'}`} style={{ width: `${g.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
