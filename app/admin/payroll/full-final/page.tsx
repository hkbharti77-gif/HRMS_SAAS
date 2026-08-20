'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { fullFinalSettlements } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/format';

type FF = (typeof fullFinalSettlements)[number];

export default function FullFinalPage() {
  const pending = fullFinalSettlements.filter((f) => f.status === 'Pending' || f.status === 'In Progress').length;
  const completed = fullFinalSettlements.filter((f) => f.status === 'Completed').length;
  const totalPayable = fullFinalSettlements.reduce((s, f) => s + f.netPayable, 0);

  const columns: Column<FF>[] = [
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
      key: 'designation',
      header: 'Designation',
      cell: (r) => <span className="text-muted-foreground">{r.designation}</span>,
      hideOnMobile: true,
    },
    {
      key: 'lastDay',
      header: 'Last Day',
      sortable: true,
      sortValue: (r) => r.lastDay,
      cell: (r) => <span className="text-muted-foreground">{formatDate(r.lastDay, 'short')}</span>,
    },
    {
      key: 'salaryPayable',
      header: 'Salary',
      sortable: true,
      sortValue: (r) => r.salaryPayable,
      cell: (r) => <span className="font-medium">{formatCurrency(r.salaryPayable)}</span>,
      hideOnMobile: true,
    },
    {
      key: 'leaveEncashment',
      header: 'Leave Encash',
      sortable: true,
      sortValue: (r) => r.leaveEncashment,
      cell: (r) => <span className="text-muted-foreground">{formatCurrency(r.leaveEncashment)}</span>,
      hideOnMobile: true,
    },
    {
      key: 'deductions',
      header: 'Deductions',
      sortable: true,
      sortValue: (r) => r.deductions,
      cell: (r) => <span className="text-danger-600">{formatCurrency(r.deductions)}</span>,
      hideOnMobile: true,
    },
    {
      key: 'netPayable',
      header: 'Net Payable',
      sortable: true,
      sortValue: (r) => r.netPayable,
      cell: (r) => <span className="font-semibold text-brand-600">{formatCurrency(r.netPayable)}</span>,
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
        r.status !== 'Completed' ? (
          <Button variant="outline" size="sm"><Icon name="PlayCircle" className="mr-1.5 h-3.5 w-3.5" />Process</Button>
        ) : null,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Full & Final Settlement"
        description="Process exit settlements — salary, leave encashment, bonus, and deductions."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Payroll' }, { label: 'Full & Final' }]}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="In progress" value={pending} icon="Clock3" tone="warning" />
        <StatCard label="Completed" value={completed} icon="CircleCheck" tone="success" />
        <StatCard label="Total payable" value={formatCurrency(totalPayable, 'USD', true)} icon="Banknote" tone="brand" />
      </div>
      <DataTable
        columns={columns}
        data={fullFinalSettlements}
        searchKeys={['employeeName', 'designation', 'status']}
        searchPlaceholder="Search settlements..."
        initialSort={{ key: 'lastDay', dir: 'asc' }}
      />
    </div>
  );
}
