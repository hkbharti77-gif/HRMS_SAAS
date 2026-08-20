'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { attendance } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import type { AttendanceRecord } from '@/lib/types';

export default function AttendanceLogPage() {
  const columns: Column<AttendanceRecord>[] = [
    {
      key: 'employeeName',
      header: 'Employee',
      sortable: true,
      sortValue: (r) => r.employeeName,
      cell: (r) => (
        <div className="flex items-center gap-2">
          <AvatarBadge name={r.employeeName} size="sm" />
          <span className="font-medium">{r.employeeName}</span>
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      sortValue: (r) => r.date,
      cell: (r) => <span className="text-muted-foreground">{formatDate(r.date, 'short')}</span>,
    },
    {
      key: 'punchIn',
      header: 'Punch In',
      cell: (r) => <span className="font-mono text-sm">{r.punchIn}</span>,
      hideOnMobile: true,
    },
    {
      key: 'punchOut',
      header: 'Punch Out',
      cell: (r) => <span className="font-mono text-sm">{r.punchOut}</span>,
      hideOnMobile: true,
    },
    {
      key: 'hours',
      header: 'Hours',
      sortable: true,
      sortValue: (r) => r.hours,
      cell: (r) => <span className="font-medium">{r.hours}h</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      sortValue: (r) => r.status,
      cell: (r) => <StatusBadge status={r.status} dot />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Attendance Log"
        description="Detailed punch-in and punch-out records for all employees."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Attendance' }, { label: 'Log' }]}
        action={{ label: 'Export', icon: 'Download', variant: 'outline' }}
      />
      <DataTable
        columns={columns}
        data={attendance}
        searchKeys={['employeeName', 'status', 'location']}
        searchPlaceholder="Search by name or status..."
        initialSort={{ key: 'date', dir: 'desc' }}
      />
    </div>
  );
}
