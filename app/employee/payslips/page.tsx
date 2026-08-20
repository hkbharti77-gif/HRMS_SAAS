'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { myPayslips } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/format';

type Payslip = (typeof myPayslips)[number];

export default function EmployeePayslipsPage() {
  const totalEarned = myPayslips.reduce((s, p) => s + p.net, 0);
  const ytdGross = myPayslips.reduce((s, p) => s + p.gross, 0);
  const ytdDeductions = myPayslips.reduce((s, p) => s + p.deductions, 0);

  const columns: Column<Payslip>[] = [
    { key: 'month', header: 'Month', sortable: true, sortValue: (r) => r.month, cell: (r) => <span className="font-medium">{r.month}</span> },
    { key: 'gross', header: 'Gross', sortable: true, sortValue: (r) => r.gross, cell: (r) => <span>{formatCurrency(r.gross)}</span>, hideOnMobile: true },
    { key: 'deductions', header: 'Deductions', sortable: true, sortValue: (r) => r.deductions, cell: (r) => <span className="text-danger-600">-{formatCurrency(r.deductions)}</span>, hideOnMobile: true },
    { key: 'net', header: 'Net Pay', sortable: true, sortValue: (r) => r.net, cell: (r) => <span className="font-semibold">{formatCurrency(r.net)}</span> },
    { key: 'status', header: 'Status', sortable: true, sortValue: (r) => r.status, cell: (r) => <StatusBadge status={r.status} dot /> },
    { key: 'actions', header: '', cell: () => <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Download" className="h-4 w-4" /></Button> },
  ];

  return (
    <div>
      <PageHeader
        title="My Payslips"
        description="View and download your monthly payslips."
        breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Payroll' }, { label: 'Payslips' }]}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="YTD gross" value={formatCurrency(ytdGross, 'USD', true)} icon="Banknote" tone="brand" />
        <StatCard label="YTD deductions" value={formatCurrency(ytdDeductions, 'USD', true)} icon="Receipt" tone="danger" />
        <StatCard label="YTD net pay" value={formatCurrency(totalEarned, 'USD', true)} icon="Wallet" tone="success" />
      </div>
      <DataTable columns={columns} data={myPayslips} searchKeys={['month', 'status']} searchPlaceholder="Search payslips..." initialSort={{ key: 'month', dir: 'desc' }} />
    </div>
  );
}
