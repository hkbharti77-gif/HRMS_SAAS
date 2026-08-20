'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { StatusBadge } from '@/components/shared/status-badge';
import { offboardingEmployees } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

export default function OffboardingPage() {
  return (
    <div>
      <PageHeader
        title="Offboarding"
        description="Manage exit processes, asset recovery, and final settlements."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'People', href: '/admin/people' }, { label: 'Offboarding' }]}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="In notice period" value={offboardingEmployees.filter((e) => e.status === 'Notice Period').length} icon="Clock3" tone="warning" />
        <StatCard label="In progress" value={offboardingEmployees.filter((e) => e.status === 'In Progress').length} icon="Activity" tone="info" />
        <StatCard label="Completed" value={offboardingEmployees.filter((e) => e.status === 'Completed').length} icon="CircleCheck" tone="success" />
      </div>
      <div className="space-y-3">
        {offboardingEmployees.map((e) => (
          <Card key={e.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{e.employeeName}</p>
                    <StatusBadge status={e.status} dot />
                  </div>
                  <p className="text-sm text-muted-foreground">{e.designation} · {e.department}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Last day: {formatDate(e.lastDay, 'long')}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Exit reason</p>
                  <p className="text-sm">{e.exitReason}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Checklist</span>
                    <span className="text-sm font-medium">{e.tasksCompleted}/{e.tasksTotal}</span>
                  </div>
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-brand-600" style={{ width: `${(e.tasksCompleted / e.tasksTotal) * 100}%` }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
