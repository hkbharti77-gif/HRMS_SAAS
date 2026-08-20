'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { FormDrawer } from '@/components/shared/form-drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loans } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/format';

type Loan = (typeof loans)[number];

export default function LoansPage() {
  const [open, setOpen] = React.useState(false);
  const active = loans.filter((l) => l.status === 'Active').length;
  const totalOutstanding = loans.filter((l) => l.status === 'Active').reduce((s, l) => s + l.balance, 0);
  const monthlyDeduction = loans.filter((l) => l.status === 'Active').reduce((s, l) => s + l.installment, 0);

  const columns: Column<Loan>[] = [
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
      key: 'type',
      header: 'Type',
      sortable: true,
      sortValue: (r) => r.type,
      cell: (r) => <span className="text-sm">{r.type}</span>,
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      sortValue: (r) => r.amount,
      cell: (r) => <span className="font-medium">{formatCurrency(r.amount)}</span>,
      hideOnMobile: true,
    },
    {
      key: 'balance',
      header: 'Outstanding',
      sortable: true,
      sortValue: (r) => r.balance,
      cell: (r) => <span className={r.balance > 0 ? 'font-medium text-warning-600' : 'font-medium text-success-600'}>{formatCurrency(r.balance)}</span>,
    },
    {
      key: 'installment',
      header: 'Monthly',
      sortable: true,
      sortValue: (r) => r.installment,
      cell: (r) => <span className="text-muted-foreground">{formatCurrency(r.installment)}</span>,
      hideOnMobile: true,
    },
    {
      key: 'issuedOn',
      header: 'Issued',
      sortable: true,
      sortValue: (r) => r.issuedOn,
      cell: (r) => <span className="text-muted-foreground">{formatDate(r.issuedOn, 'short')}</span>,
      hideOnMobile: true,
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
        title="Loans & Advances"
        description="Track salary advances, personal loans, and their repayment schedules."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Payroll' }, { label: 'Loans' }]}
        action={{ label: 'Issue loan', icon: 'Plus', onClick: () => setOpen(true) }}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Active loans" value={active} icon="HandCoins" tone="brand" />
        <StatCard label="Outstanding" value={formatCurrency(totalOutstanding, 'USD', true)} icon="Wallet" tone="warning" />
        <StatCard label="Monthly deduction" value={formatCurrency(monthlyDeduction, 'USD', true)} icon="Minus" tone="info" />
      </div>
      <DataTable
        columns={columns}
        data={loans}
        searchKeys={['employeeName', 'type', 'status']}
        searchPlaceholder="Search loans..."
      />

      <FormDrawer
        open={open}
        onOpenChange={setOpen}
        title="Issue Loan"
        description="Provide a salary advance or loan to an employee."
        onSubmit={() => setOpen(false)}
        submitLabel="Issue"
      >
        <div className="space-y-2"><Label>Employee</Label><Input placeholder="Search employee..." /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Loan type</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>Salary Advance</option><option>Personal Loan</option><option>Relocation Loan</option></select></div>
          <div className="space-y-2"><Label>Amount</Label><Input type="number" placeholder="5000" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Monthly installment</Label><Input type="number" placeholder="500" /></div>
          <div className="space-y-2"><Label>Issue date</Label><Input type="date" /></div>
        </div>
      </FormDrawer>
    </div>
  );
}
