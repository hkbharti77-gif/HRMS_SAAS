'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { regularizations } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';

type Reg = (typeof regularizations)[number];

export default function RegularizationPage() {
  const { toast } = useToast();
  const [requests, setRequests] = React.useState<Reg[]>(regularizations);

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: action, approver: 'Admin' } : r));
    toast({ title: `Regularization ${action.toLowerCase()}`, description: action === 'Approved' ? 'The attendance record has been corrected.' : 'The employee has been notified of the rejection.' });
  };

  const columns: Column<Reg>[] = [
    { key: 'employeeName', header: 'Employee', cell: (r) => (<div className="flex items-center gap-2"><AvatarBadge name={r.employeeName} size="sm" /><span className="font-medium">{r.employeeName}</span></div>) },
    { key: 'type', header: 'Type', sortable: true, sortValue: (r) => r.type, cell: (r) => <span className="text-sm">{r.type}</span> },
    { key: 'date', header: 'For date', sortable: true, sortValue: (r) => r.date, cell: (r) => <span className="text-muted-foreground">{formatDate(r.date, 'short')}</span> },
    { key: 'reason', header: 'Reason', cell: (r) => <span className="text-muted-foreground line-clamp-1">{r.reason}</span>, hideOnMobile: true },
    { key: 'status', header: 'Status', sortable: true, sortValue: (r) => r.status, cell: (r) => <StatusBadge status={r.status} dot /> },
    { key: 'actions', header: '', cell: (r) => r.status === 'Pending' ? (<div className="flex gap-1"><Button variant="outline" size="icon" className="h-8 w-8 text-success-600 hover:bg-success-50 dark:hover:bg-success-500/10" onClick={() => handleAction(r.id, 'Approved')}><Icon name="Check" className="h-4 w-4" /></Button><Button variant="outline" size="icon" className="h-8 w-8 text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-500/10" onClick={() => handleAction(r.id, 'Rejected')}><Icon name="X" className="h-4 w-4" /></Button></div>) : null },
  ];

  return (
    <div>
      <PageHeader title="Regularization" description="Review and approve attendance correction requests from employees." breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Attendance' }, { label: 'Regularization' }]} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Pending" value={requests.filter((r) => r.status === 'Pending').length} icon="Clock3" tone="warning" />
        <StatCard label="Approved" value={requests.filter((r) => r.status === 'Approved').length} icon="CircleCheck" tone="success" />
        <StatCard label="Rejected" value={requests.filter((r) => r.status === 'Rejected').length} icon="CircleX" tone="danger" />
      </div>
      <DataTable columns={columns} data={requests} searchKeys={['employeeName', 'type', 'reason', 'status']} searchPlaceholder="Search requests..." initialSort={{ key: 'date', dir: 'desc' }} />
    </div>
  );
}
