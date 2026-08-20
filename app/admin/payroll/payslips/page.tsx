'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { payslips } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/format';
import type { Payslip } from '@/lib/types';

export default function PayslipsPage() {
  const columns: Column<Payslip>[] = [
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
      key: 'month',
      header: 'Month',
      sortable: true,
      sortValue: (r) => r.month,
      cell: (r) => <span className="text-muted-foreground">{r.month}</span>,
    },
    {
      key: 'gross',
      header: 'Gross',
      sortable: true,
      sortValue: (r) => r.gross,
      cell: (r) => <span className="font-medium">{formatCurrency(r.gross)}</span>,
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
      key: 'net',
      header: 'Net Pay',
      sortable: true,
      sortValue: (r) => r.net,
      cell: (r) => <span className="font-semibold">{formatCurrency(r.net)}</span>,
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
      cell: (r) => (
        <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Download" className="h-4 w-4" /></Button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Payslips"
        description="Generate, view, and download employee payslips."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Payroll' }, { label: 'Payslips' }]}
        action={{ label: 'Generate payslips', icon: 'FilePlus' }}
      />
      <DataTable
        columns={columns}
        data={payslips}
        searchKeys={['employeeName', 'month', 'status']}
        searchPlaceholder="Search payslips..."
        initialSort={{ key: 'month', dir: 'desc' }}
      />
    </div>
  );
}
