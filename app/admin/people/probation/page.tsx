'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Icon } from '@/components/shared/icon';
import { probationEmployees } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

export default function ProbationPage() {
  return (
    <div>
      <PageHeader
        title="Probation"
        description="Track employees in their probation period and schedule reviews."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'People', href: '/admin/people' }, { label: 'Probation' }]}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="In progress" value={probationEmployees.filter((e) => e.status === 'In Progress').length} icon="Hourglass" tone="info" />
        <StatCard label="Review due" value={probationEmployees.filter((e) => e.status === 'Review Due').length} icon="Clock3" tone="warning" />
        <StatCard label="Overdue" value={probationEmployees.filter((e) => e.status === 'Overdue').length} icon="AlertTriangle" tone="danger" />
      </div>
      <div className="space-y-3">
        {probationEmployees.map((e) => (
          <Card key={e.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <AvatarBadge name={e.employeeName} size="md" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{e.employeeName}</p>
                    <StatusBadge status={e.status} dot />
                  </div>
                  <p className="text-sm text-muted-foreground">{e.designation} · {e.department}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-xs text-muted-foreground">Start</p>
                  <p className="text-sm font-medium">{formatDate(e.startDate, 'short')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">End</p>
                  <p className="text-sm font-medium">{formatDate(e.endDate, 'short')}</p>
                </div>
                <div className={`text-center ${e.daysLeft < 0 ? 'text-danger-600' : e.daysLeft < 15 ? 'text-warning-600' : ''}`}>
                  <p className="text-xs text-muted-foreground">Days left</p>
                  <p className="text-sm font-bold">{e.daysLeft < 0 ? `${Math.abs(e.daysLeft)}d overdue` : `${e.daysLeft}d`}</p>
                </div>
                <Button size="sm" variant="outline">
                  <Icon name="FileSearch" className="mr-2 h-4 w-4" />
                  Review
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
