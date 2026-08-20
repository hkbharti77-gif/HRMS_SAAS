'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { transferRequests } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

type Transfer = (typeof transferRequests)[number];

export default function TransfersPage() {
  const columns: Column<Transfer>[] = [
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
      key: 'fromDept',
      header: 'From',
      cell: (r) => (
        <div className="text-sm">
          <p>{r.fromDept}</p>
          <p className="text-xs text-muted-foreground">{r.fromLocation}</p>
        </div>
      ),
      hideOnMobile: true,
    },
    {
      key: 'toDept',
      header: 'To',
      cell: (r) => (
        <div className="text-sm">
          <p>{r.toDept}</p>
          <p className="text-xs text-muted-foreground">{r.toLocation}</p>
        </div>
      ),
      hideOnMobile: true,
    },
    {
      key: 'reason',
      header: 'Reason',
      cell: (r) => <span className="text-muted-foreground line-clamp-1">{r.reason}</span>,
      hideOnMobile: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      sortValue: (r) => r.status,
      cell: (r) => <StatusBadge status={r.status} dot />,
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      sortValue: (r) => r.date,
      cell: (r) => <span className="text-muted-foreground">{formatDate(r.date, 'short')}</span>,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Transfers"
        description="Department and location transfers across your organization."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'People', href: '/admin/people' }, { label: 'Transfers' }]}
      />
      <DataTable
        columns={columns}
        data={transferRequests}
        searchKeys={['employeeName', 'fromDept', 'toDept', 'reason']}
        searchPlaceholder="Search transfers..."
        initialSort={{ key: 'date', dir: 'desc' }}
      />
    </div>
  );
}
