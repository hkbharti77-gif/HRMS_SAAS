'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { leaveBalances } from '@/lib/mock-data';

type Balance = (typeof leaveBalances)[number];

export default function LeaveBalancesPage() {
  const columns: Column<Balance>[] = [
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
      key: 'department',
      header: 'Department',
      sortable: true,
      sortValue: (r) => r.department,
      cell: (r) => <span className="text-muted-foreground">{r.department}</span>,
      hideOnMobile: true,
    },
    {
      key: 'casual',
      header: 'Casual',
      sortable: true,
      sortValue: (r) => r.casual,
      cell: (r) => (
        <div className="w-24">
          <div className="flex justify-between text-xs"><span className="font-medium">{r.casual}</span><span className="text-muted-foreground">/12</span></div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-brand-500" style={{ width: `${(r.casual / 12) * 100}%` }} /></div>
        </div>
      ),
    },
    {
      key: 'sick',
      header: 'Sick',
      sortable: true,
      sortValue: (r) => r.sick,
      cell: (r) => (
        <div className="w-24">
          <div className="flex justify-between text-xs"><span className="font-medium">{r.sick}</span><span className="text-muted-foreground">/12</span></div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-success-500" style={{ width: `${(r.sick / 12) * 100}%` }} /></div>
        </div>
      ),
    },
    {
      key: 'earned',
      header: 'Earned',
      sortable: true,
      sortValue: (r) => r.earned,
      cell: (r) => (
        <div className="w-24">
          <div className="flex justify-between text-xs"><span className="font-medium">{r.earned}</span><span className="text-muted-foreground">/24</span></div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-warning-500" style={{ width: `${(r.earned / 24) * 100}%` }} /></div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Leave Balances"
        description="Current leave balances for all employees across leave types."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Leave' }, { label: 'Balances' }]}
        action={{ label: 'Export', icon: 'Download', variant: 'outline' }}
      />
      <DataTable
        columns={columns}
        data={leaveBalances}
        searchKeys={['employeeName', 'department']}
        searchPlaceholder="Search employees..."
      />
    </div>
  );
}
