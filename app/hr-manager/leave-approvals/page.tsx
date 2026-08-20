'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { leaveRequests } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import type { LeaveRequest } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function HrManagerLeaveApprovalsPage() {
  const { toast } = useToast();
  const [filter, setFilter] = React.useState<'all' | 'Pending' | 'Approved' | 'Rejected'>('all');
  const [requests, setRequests] = React.useState<LeaveRequest[]>(leaveRequests);

  const data = filter === 'all' ? requests : requests.filter((l) => l.status === filter);

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    setRequests((prev) => prev.map((l) => l.id === id ? { ...l, status: action, approver: 'HR Manager' } : l));
    toast({ title: `Leave ${action.toLowerCase()}`, description: action === 'Approved' ? 'The employee has been notified.' : 'The employee has been notified of the rejection.' });
  };

  const columns: Column<LeaveRequest>[] = [
    { key: 'employeeName', header: 'Employee', sortable: true, sortValue: (r) => r.employeeName, cell: (r) => (<div className="flex items-center gap-2"><AvatarBadge name={r.employeeName} size="sm" /><span className="font-medium">{r.employeeName}</span></div>) },
    { key: 'type', header: 'Type', sortable: true, sortValue: (r) => r.type, cell: (r) => <span className="text-sm">{r.type}</span> },
    { key: 'from', header: 'Dates', cell: (r) => <span className="text-sm text-muted-foreground">{formatDate(r.from, 'short')} – {formatDate(r.to, 'short')}</span>, hideOnMobile: true },
    { key: 'days', header: 'Days', sortable: true, sortValue: (r) => r.days, cell: (r) => <span className="font-medium">{r.days}d</span> },
    { key: 'reason', header: 'Reason', cell: (r) => <span className="text-muted-foreground line-clamp-1">{r.reason}</span>, hideOnMobile: true },
    { key: 'status', header: 'Status', sortable: true, sortValue: (r) => r.status, cell: (r) => <StatusBadge status={r.status} dot /> },
    { key: 'actions', header: '', cell: (r) => r.status === 'Pending' ? (<div className="flex gap-1"><Button variant="outline" size="icon" className="h-8 w-8 text-success-600 hover:bg-success-50 dark:hover:bg-success-500/10" onClick={() => handleAction(r.id, 'Approved')}><Icon name="Check" className="h-4 w-4" /></Button><Button variant="outline" size="icon" className="h-8 w-8 text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-500/10" onClick={() => handleAction(r.id, 'Rejected')}><Icon name="X" className="h-4 w-4" /></Button></div>) : null },
  ];

  return (
    <div>
      <PageHeader title="Leave Approvals" description="Review and act on all employee leave requests." breadcrumbs={[{ label: 'HR Manager', href: '/hr-manager/dashboard' }, { label: 'Leave Approvals' }]} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Pending" value={requests.filter((l) => l.status === 'Pending').length} icon="Clock3" tone="warning" />
        <StatCard label="Approved" value={requests.filter((l) => l.status === 'Approved').length} icon="CircleCheck" tone="success" />
        <StatCard label="Rejected" value={requests.filter((l) => l.status === 'Rejected').length} icon="CircleX" tone="danger" />
      </div>
      <DataTable columns={columns} data={data} searchKeys={['employeeName', 'type', 'reason']} searchPlaceholder="Search leave requests..." initialSort={{ key: 'from', dir: 'desc' }} toolbar={<div className="flex items-center gap-1 rounded-lg border p-1">{(['all', 'Pending', 'Approved', 'Rejected'] as const).map((f) => (<Button key={f} variant={filter === f ? 'secondary' : 'ghost'} size="sm" className="h-7 px-3 text-xs capitalize" onClick={() => setFilter(f)}>{f}</Button>))}</div>} />
    </div>
  );
}
