'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { expenseClaims } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/format';
import type { ExpenseClaim } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function ExpenseApprovalsPage() {
  const { toast } = useToast();
  const [claims, setClaims] = React.useState<ExpenseClaim[]>(expenseClaims);

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    setClaims((prev) => prev.map((e) => e.id === id ? { ...e, status: action } : e));
    toast({ title: `Expense ${action.toLowerCase()}`, description: action === 'Approved' ? 'The claim will be processed in the next payroll cycle.' : 'The employee has been notified of the rejection.' });
  };

  const pending = claims.filter((e) => e.status === 'Pending').length;
  const approved = claims.filter((e) => e.status === 'Approved' || e.status === 'Reimbursed').length;
  const totalAmount = claims.filter((e) => e.status === 'Pending').reduce((s, e) => s + e.amount, 0);

  const columns: Column<ExpenseClaim>[] = [
    { key: 'employeeName', header: 'Employee', sortable: true, sortValue: (r) => r.employeeName, cell: (r) => (<div className="flex items-center gap-2"><AvatarBadge name={r.employeeName} size="sm" /><span className="font-medium">{r.employeeName}</span></div>) },
    { key: 'category', header: 'Category', sortable: true, sortValue: (r) => r.category, cell: (r) => <span className="text-sm">{r.category}</span> },
    { key: 'amount', header: 'Amount', sortable: true, sortValue: (r) => r.amount, cell: (r) => <span className="font-medium">{formatCurrency(r.amount)}</span> },
    { key: 'date', header: 'Date', sortable: true, sortValue: (r) => r.date, cell: (r) => <span className="text-muted-foreground">{formatDate(r.date, 'short')}</span>, hideOnMobile: true },
    { key: 'description', header: 'Description', cell: (r) => <span className="text-muted-foreground line-clamp-1">{r.description}</span>, hideOnMobile: true },
    { key: 'status', header: 'Status', sortable: true, sortValue: (r) => r.status, cell: (r) => <StatusBadge status={r.status} dot /> },
    { key: 'actions', header: '', cell: (r) => r.status === 'Pending' ? (<div className="flex gap-1"><Button variant="outline" size="icon" className="h-8 w-8 text-success-600 hover:bg-success-50 dark:hover:bg-success-500/10" onClick={() => handleAction(r.id, 'Approved')}><Icon name="Check" className="h-4 w-4" /></Button><Button variant="outline" size="icon" className="h-8 w-8 text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-500/10" onClick={() => handleAction(r.id, 'Rejected')}><Icon name="X" className="h-4 w-4" /></Button></div>) : null },
  ];

  return (
    <div>
      <PageHeader title="Expense Approvals" description="Review and approve employee expense claims." breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Expenses' }, { label: 'Approvals' }]} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Pending" value={pending} icon="Clock3" tone="warning" footer="claims" />
        <StatCard label="Approved" value={approved} icon="CircleCheck" tone="success" footer="claims" />
        <StatCard label="Pending amount" value={formatCurrency(totalAmount, 'USD', true)} icon="Wallet" tone="brand" />
      </div>
      <DataTable columns={columns} data={claims} searchKeys={['employeeName', 'category', 'status', 'description']} searchPlaceholder="Search claims..." initialSort={{ key: 'date', dir: 'desc' }} />
    </div>
  );
}
