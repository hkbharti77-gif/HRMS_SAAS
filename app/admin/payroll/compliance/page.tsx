'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/status-badge';
import { Icon } from '@/components/shared/icon';
import { complianceFilings } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

export default function CompliancePage() {
  const upToDate = complianceFilings.filter((c) => c.status === 'Up to Date').length;
  const actionRequired = complianceFilings.filter((c) => c.status === 'Action Required').length;
  const draft = complianceFilings.filter((c) => c.status === 'Draft').length;

  return (
    <div>
      <PageHeader
        title="Compliance"
        description="Track tax filings, social security contributions, and statutory obligations."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Payroll' }, { label: 'Compliance' }]}
        action={{ label: 'Export', icon: 'Download', variant: 'outline' }}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Up to date" value={upToDate} icon="CircleCheck" tone="success" />
        <StatCard label="Action required" value={actionRequired} icon="AlertTriangle" tone="warning" />
        <StatCard label="Draft" value={draft} icon="FileEdit" tone="info" />
      </div>
      <div className="space-y-3">
        {complianceFilings.map((c) => (
          <Card key={c.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                  <Icon name="Landmark" className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.jurisdiction}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-xs text-muted-foreground">Last filed</p>
                  <p className="text-sm font-medium">{c.lastFiled !== '—' ? formatDate(c.lastFiled, 'short') : '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Due date</p>
                  <p className="text-sm font-medium">{formatDate(c.dueDate, 'short')}</p>
                </div>
                <StatusBadge status={c.status} dot />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
