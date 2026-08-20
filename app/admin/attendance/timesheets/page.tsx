'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { timesheets } from '@/lib/mock-data';

type Timesheet = (typeof timesheets)[number];

export default function TimesheetsPage() {
  const columns: Column<Timesheet>[] = [
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
      key: 'week',
      header: 'Week',
      sortable: true,
      sortValue: (r) => r.week,
      cell: (r) => <span className="text-muted-foreground">{r.week}</span>,
    },
    {
      key: 'project',
      header: 'Project',
      cell: (r) => <span className="text-sm">{r.project}</span>,
      hideOnMobile: true,
    },
    {
      key: 'hours',
      header: 'Total Hrs',
      sortable: true,
      sortValue: (r) => r.hours,
      cell: (r) => <span className="font-medium">{r.hours}h</span>,
    },
    {
      key: 'billable',
      header: 'Billable',
      sortable: true,
      sortValue: (r) => r.billable,
      cell: (r) => <span className="text-muted-foreground">{r.billable}h</span>,
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
      key: 'actions',
      header: '',
      cell: (r) =>
        r.status === 'Submitted' || r.status === 'Pending' ? (
          <div className="flex gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8 text-success-600"><Icon name="Check" className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="h-8 w-8 text-danger-600"><Icon name="X" className="h-4 w-4" /></Button>
          </div>
        ) : null,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Timesheets"
        description="Review and approve weekly timesheets with project and billable hour breakdowns."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Attendance' }, { label: 'Timesheets' }]}
        action={{ label: 'Export', icon: 'Download', variant: 'outline' }}
      />
      <DataTable
        columns={columns}
        data={timesheets}
        searchKeys={['employeeName', 'project', 'status']}
        searchPlaceholder="Search timesheets..."
      />
    </div>
  );
}
