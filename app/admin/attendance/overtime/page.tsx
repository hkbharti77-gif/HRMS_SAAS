'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { overtimeRecords } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';

type OT = (typeof overtimeRecords)[number];

export default function OvertimePage() {
  const { toast } = useToast();
  const [records, setRecords] = React.useState<OT[]>(overtimeRecords);

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    setRecords((prev) => prev.map((o) => o.id === id ? { ...o, status: action } : o));
    toast({ title: `Overtime ${action.toLowerCase()}`, description: action === 'Approved' ? 'The overtime hours will be included in the next payroll.' : 'The employee has been notified of the rejection.' });
  };

  const pending = records.filter((o) => o.status === 'Pending').length;
  const approved = records.filter((o) => o.status === 'Approved').length;
  const totalHours = records.filter((o) => o.status === 'Approved').reduce((s, o) => s + o.hours, 0);

  const columns: Column<OT>[] = [
    { key: 'employeeName', header: 'Employee', cell: (r) => (<div className="flex items-center gap-2"><AvatarBadge name={r.employeeName} size="sm" /><span className="font-medium">{r.employeeName}</span></div>) },
    { key: 'date', header: 'Date', sortable: true, sortValue: (r) => r.date, cell: (r) => <span className="text-muted-foreground">{formatDate(r.date, 'short')}</span> },
    { key: 'hours', header: 'Hours', sortable: true, sortValue: (r) => r.hours, cell: (r) => <span className="font-medium">{r.hours}h</span> },
    { key: 'rate', header: 'Rate', cell: (r) => <span className="text-muted-foreground">{r.rate}x</span>, hideOnMobile: true },
    { key: 'reason', header: 'Reason', cell: (r) => <span className="text-muted-foreground line-clamp-1">{r.reason}</span>, hideOnMobile: true },
    { key: 'status', header: 'Status', sortable: true, sortValue: (r) => r.status, cell: (r) => <StatusBadge status={r.status} dot /> },
    { key: 'actions', header: '', cell: (r) => r.status === 'Pending' ? (<div className="flex gap-1"><Button variant="outline" size="icon" className="h-8 w-8 text-success-600 hover:bg-success-50 dark:hover:bg-success-500/10" onClick={() => handleAction(r.id, 'Approved')}><Icon name="Check" className="h-4 w-4" /></Button><Button variant="outline" size="icon" className="h-8 w-8 text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-500/10" onClick={() => handleAction(r.id, 'Rejected')}><Icon name="X" className="h-4 w-4" /></Button></div>) : null },
  ];

  return (
    <div>
      <PageHeader title="Overtime" description="Track and approve overtime hours across your workforce." breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Attendance' }, { label: 'Overtime' }]} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Approved hours" value={`${totalHours}h`} icon="CircleCheck" tone="success" />
        <StatCard label="Pending approval" value={pending} icon="ClockAlert" tone="warning" />
        <StatCard label="Total claims" value={records.length} icon="FileText" tone="info" />
      </div>
      <DataTable columns={columns} data={records} searchKeys={['employeeName', 'reason', 'status']} searchPlaceholder="Search overtime..." initialSort={{ key: 'date', dir: 'desc' }} />
    </div>
  );
}
