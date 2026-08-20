'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { myGoals } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

export default function EmployeePerformancePage() {
  const onTrack = myGoals.filter((g) => g.status === 'On Track').length;
  const avgProgress = Math.round(myGoals.reduce((s, g) => s + g.progress, 0) / myGoals.length);

  return (
    <div>
      <PageHeader
        title="My Performance"
        description="Track your goals, key results, and review progress."
        breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Performance' }]}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Active goals" value={myGoals.length} icon="Target" tone="brand" />
        <StatCard label="On track" value={onTrack} icon="TrendingUp" tone="success" footer={`of ${myGoals.length}`} />
        <StatCard label="Avg progress" value={`${avgProgress}%`} icon="Gauge" tone="info" />
      </div>

      <div className="space-y-4">
        {myGoals.map((g) => (
          <Card key={g.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{g.title}</p>
                <StatusBadge status={g.status} dot />
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Due {formatDate(g.dueDate, 'short')}</span>
                  <span className="font-medium">{g.progress}%</span>
                </div>
                <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full rounded-full ${g.progress >= 70 ? 'bg-success-500' : g.progress >= 40 ? 'bg-brand-500' : 'bg-warning-500'}`} style={{ width: `${g.progress}%` }} />
                </div>
              </div>
              <div className="mt-4 space-y-2 border-t pt-3">
                <p className="text-xs font-medium text-muted-foreground">Key Results</p>
                {g.keyResults.map((kr) => (
                  <div key={kr.id} className="flex items-center gap-2 text-sm">
                    <Icon name={kr.done ? 'CircleCheck' : 'CircleDot'} className={`h-4 w-4 ${kr.done ? 'text-success-600' : 'text-muted-foreground'}`} />
                    <span className={kr.done ? 'text-muted-foreground line-through' : ''}>{kr.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
