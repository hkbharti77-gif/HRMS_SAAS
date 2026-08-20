'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/status-badge';
import { Icon } from '@/components/shared/icon';
import { reviewCycles } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

export default function ReviewCyclesPage() {
  const active = reviewCycles.filter((r) => r.status === 'Active').length;
  const completed = reviewCycles.filter((r) => r.status === 'Completed').length;

  return (
    <div>
      <PageHeader
        title="Review Cycles"
        description="Manage performance review cycles, track completion, and launch new reviews."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Performance' }, { label: 'Reviews' }]}
        action={{ label: 'New cycle', icon: 'Plus' }}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Active cycles" value={active} icon="Repeat" tone="brand" />
        <StatCard label="Completed" value={completed} icon="CircleCheck" tone="success" />
        <StatCard label="Total participants" value={reviewCycles.reduce((s, r) => s + r.participants, 0)} icon="Users" tone="info" />
      </div>

      <div className="space-y-4">
        {reviewCycles.map((r) => {
          const completionRate = Math.round((r.completed / r.participants) * 100) || 0;
          const selfRate = Math.round((r.selfDone / r.participants) * 100) || 0;
          const mgrRate = Math.round((r.managerDone / r.participants) * 100) || 0;

          return (
            <Card key={r.id} className="transition-shadow hover:shadow-soft">
              <CardContent className="p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{r.name}</h3>
                      <StatusBadge status={r.status} dot />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{r.type} · {formatDate(r.startDate, 'short')} – {formatDate(r.endDate, 'short')}</p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      <div>
                        <div className="flex justify-between text-xs"><span className="text-muted-foreground">Overall</span><span className="font-medium">{r.completed}/{r.participants}</span></div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-brand-500" style={{ width: `${completionRate}%` }} /></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs"><span className="text-muted-foreground">Self-assessment</span><span className="font-medium">{r.selfDone}/{r.participants}</span></div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-success-500" style={{ width: `${selfRate}%` }} /></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs"><span className="text-muted-foreground">Manager review</span><span className="font-medium">{r.managerDone}/{r.participants}</span></div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-warning-500" style={{ width: `${mgrRate}%` }} /></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Icon name="Eye" className="mr-1.5 h-3.5 w-3.5" />Details</Button>
                    {r.status === 'Active' && <Button size="sm"><Icon name="Send" className="mr-1.5 h-3.5 w-3.5" />Send reminders</Button>}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
