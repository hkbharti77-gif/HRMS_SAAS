'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { employeeLifecycle } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

type Lifecycle = (typeof employeeLifecycle)[number];

const eventTone: Record<string, 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'purple'> = {
  Onboarded: 'success',
  Promoted: 'brand',
  Transferred: 'info',
  Exited: 'danger',
  'Probation Completed': 'success',
  'Role Changed': 'warning',
};

export default function LifecyclePage() {
  const columns: Column<Lifecycle>[] = [
    {
      key: 'employeeName',
      header: 'Employee',
      cell: (r) => (
        <div className="flex items-center gap-2">
          <AvatarBadge name={r.employeeName} size="sm" />
          <span className="font-medium">{r.employeeName}</span>
        </div>
      ),
    },
    {
      key: 'event',
      header: 'Event',
      sortable: true,
      sortValue: (r) => r.event,
      cell: (r) => <StatusBadge status={r.event} tone={eventTone[r.event]} />,
    },
    {
      key: 'details',
      header: 'Details',
      cell: (r) => <span className="text-muted-foreground">{r.details}</span>,
      hideOnMobile: true,
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      sortValue: (r) => r.date,
      cell: (r) => <span className="text-muted-foreground">{formatDate(r.date, 'medium')}</span>,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Employee Lifecycle"
        description="Track every employment event — onboarding, promotions, transfers, and exits."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'People', href: '/admin/people' }, { label: 'Lifecycle' }]}
        action={{ label: 'Export', icon: 'Download', variant: 'outline' }}
      />
      <DataTable
        columns={columns}
        data={employeeLifecycle}
        searchKeys={['employeeName', 'event', 'details']}
        searchPlaceholder="Search lifecycle events..."
        initialSort={{ key: 'date', dir: 'desc' }}
      />
    </div>
  );
}
