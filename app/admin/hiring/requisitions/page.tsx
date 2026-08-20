'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { FormDrawer } from '@/components/shared/form-drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { requisitions } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/format';

type Req = (typeof requisitions)[number];

export default function RequisitionsPage() {
  const [open, setOpen] = React.useState(false);
  const openCount = requisitions.filter((r) => r.status === 'Open').length;
  const totalHeadcount = requisitions.reduce((s, r) => s + r.headcount, 0);
  const filled = requisitions.reduce((s, r) => s + r.filled, 0);

  const columns: Column<Req>[] = [
    {
      key: 'title',
      header: 'Position',
      sortable: true,
      sortValue: (r) => r.title,
      cell: (r) => <span className="font-medium">{r.title}</span>,
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
      key: 'location',
      header: 'Location',
      cell: (r) => <span className="text-muted-foreground">{r.location}</span>,
      hideOnMobile: true,
    },
    {
      key: 'headcount',
      header: 'Slots',
      sortable: true,
      sortValue: (r) => r.headcount,
      cell: (r) => <span className="font-medium">{r.filled}/{r.headcount}</span>,
    },
    {
      key: 'budget',
      header: 'Budget',
      sortable: true,
      sortValue: (r) => r.budget,
      cell: (r) => <span className="text-muted-foreground">{formatCurrency(r.budget)}</span>,
      hideOnMobile: true,
    },
    {
      key: 'hiringManager',
      header: 'Hiring Mgr',
      cell: (r) => <span className="text-muted-foreground">{r.hiringManager}</span>,
      hideOnMobile: true,
    },
    {
      key: 'openedOn',
      header: 'Opened',
      sortable: true,
      sortValue: (r) => r.openedOn,
      cell: (r) => <span className="text-muted-foreground">{formatDate(r.openedOn, 'short')}</span>,
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
        title="Requisitions"
        description="Manage hiring requisitions, headcount approvals, and budgets."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Hiring' }, { label: 'Requisitions' }]}
        action={{ label: 'New requisition', icon: 'Plus', onClick: () => setOpen(true) }}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Open reqs" value={openCount} icon="Briefcase" tone="brand" />
        <StatCard label="Total headcount" value={totalHeadcount} icon="Users" tone="info" footer={`${filled} filled`} />
        <StatCard label="Total budget" value={formatCurrency(requisitions.reduce((s, r) => s + r.budget * r.headcount, 0), 'USD', true)} icon="Wallet" tone="success" />
      </div>
      <DataTable
        columns={columns}
        data={requisitions}
        searchKeys={['title', 'department', 'location', 'status', 'hiringManager']}
        searchPlaceholder="Search requisitions..."
        initialSort={{ key: 'openedOn', dir: 'desc' }}
      />

      <FormDrawer
        open={open}
        onOpenChange={setOpen}
        title="New Requisition"
        description="Request a new hiring position."
        onSubmit={() => setOpen(false)}
        submitLabel="Submit"
      >
        <div className="space-y-2"><Label>Job title</Label><Input placeholder="e.g. Senior Backend Engineer" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Department</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>Engineering</option><option>Sales</option><option>Product</option><option>Design</option><option>Operations</option></select></div>
          <div className="space-y-2"><Label>Location</Label><Input placeholder="e.g. Remote" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Headcount</Label><Input type="number" defaultValue={1} /></div>
          <div className="space-y-2"><Label>Annual budget</Label><Input type="number" placeholder="150000" /></div>
        </div>
        <div className="space-y-2"><Label>Hiring manager</Label><Input placeholder="Search employee..." /></div>
      </FormDrawer>
    </div>
  );
}
