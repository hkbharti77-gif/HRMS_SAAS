'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { assetRequests as initialRequests } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';

type AssetReq = (typeof initialRequests)[number];

export default function AssetRequestsPage() {
  const { toast } = useToast();
  const [requests, setRequests] = React.useState<AssetReq[]>(initialRequests);

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: action } : r));
    toast({ title: `Asset request ${action.toLowerCase()}`, description: action === 'Approved' ? 'The IT team will process the asset assignment.' : 'The employee has been notified of the rejection.' });
  };

  const pending = requests.filter((r) => r.status === 'Pending').length;
  const approved = requests.filter((r) => r.status === 'Approved' || r.status === 'Fulfilled').length;
  const rejected = requests.filter((r) => r.status === 'Rejected').length;

  const columns: Column<AssetReq>[] = [
    { key: 'employeeName', header: 'Employee', sortable: true, sortValue: (r) => r.employeeName, cell: (r) => (<div className="flex items-center gap-2"><AvatarBadge name={r.employeeName} size="sm" /><span className="font-medium">{r.employeeName}</span></div>) },
    { key: 'item', header: 'Item Requested', sortable: true, sortValue: (r) => r.item, cell: (r) => <span className="font-medium">{r.item}</span> },
    { key: 'reason', header: 'Reason', cell: (r) => <span className="text-muted-foreground line-clamp-1">{r.reason}</span>, hideOnMobile: true },
    { key: 'date', header: 'Date', sortable: true, sortValue: (r) => r.date, cell: (r) => <span className="text-muted-foreground">{formatDate(r.date, 'short')}</span>, hideOnMobile: true },
    { key: 'status', header: 'Status', sortable: true, sortValue: (r) => r.status, cell: (r) => <StatusBadge status={r.status} dot /> },
    { key: 'actions', header: '', cell: (r) => r.status === 'Pending' ? (<div className="flex gap-1"><Button variant="outline" size="icon" className="h-8 w-8 text-success-600 hover:bg-success-50 dark:hover:bg-success-500/10" onClick={() => handleAction(r.id, 'Approved')}><Icon name="Check" className="h-4 w-4" /></Button><Button variant="outline" size="icon" className="h-8 w-8 text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-500/10" onClick={() => handleAction(r.id, 'Rejected')}><Icon name="X" className="h-4 w-4" /></Button></div>) : null },
  ];

  return (
    <div>
      <PageHeader title="Asset Requests" description="Review and fulfill employee asset requests." breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Assets' }, { label: 'Requests' }]} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Pending" value={pending} icon="Clock3" tone="warning" />
        <StatCard label="Approved" value={approved} icon="CircleCheck" tone="success" />
        <StatCard label="Rejected" value={rejected} icon="CircleX" tone="danger" />
      </div>
      <DataTable columns={columns} data={requests} searchKeys={['employeeName', 'item', 'status', 'reason']} searchPlaceholder="Search requests..." initialSort={{ key: 'date', dir: 'desc' }} />
    </div>
  );
}
