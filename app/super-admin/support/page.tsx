'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { StatusBadge } from '@/components/shared/status-badge';
import { Icon } from '@/components/shared/icon';
import { platformTickets } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

type Ticket = (typeof platformTickets)[number];

export default function SupportTicketsPage() {
  const columns: Column<Ticket>[] = [
    {
      key: 'subject',
      header: 'Subject',
      sortable: true,
      sortValue: (r) => r.subject,
      cell: (r) => (
        <div>
          <p className="font-medium">{r.subject}</p>
          <p className="text-xs text-muted-foreground">{r.id.toUpperCase()}</p>
        </div>
      ),
    },
    {
      key: 'tenant',
      header: 'Tenant',
      sortable: true,
      sortValue: (r) => r.tenant,
      cell: (r) => <span className="text-muted-foreground">{r.tenant}</span>,
      hideOnMobile: true,
    },
    {
      key: 'priority',
      header: 'Priority',
      sortable: true,
      sortValue: (r) => r.priority,
      cell: (r) => <StatusBadge status={r.priority} />,
    },
    {
      key: 'assignee',
      header: 'Assignee',
      cell: (r) => <span className="text-muted-foreground">{r.assignee}</span>,
      hideOnMobile: true,
    },
    {
      key: 'sla',
      header: 'SLA',
      cell: (r) => (
        <span className={r.sla === 'Overdue' ? 'font-medium text-danger-600' : r.sla === 'Met' ? 'text-success-600' : 'text-muted-foreground'}>
          {r.sla}
        </span>
      ),
      hideOnMobile: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      sortValue: (r) => r.status,
      cell: (r) => <StatusBadge status={r.status} dot />,
    },
    {
      key: 'createdAt',
      header: 'Created',
      sortable: true,
      sortValue: (r) => r.createdAt,
      cell: (r) => <span className="text-muted-foreground">{formatDate(r.createdAt, 'short')}</span>,
      hideOnMobile: true,
    },
  ];

  const open = platformTickets.filter((t) => t.status === 'Open').length;
  const inProgress = platformTickets.filter((t) => t.status === 'In Progress').length;
  const overdue = platformTickets.filter((t) => t.sla === 'Overdue').length;
  const resolved = platformTickets.filter((t) => t.status === 'Resolved' || t.status === 'Closed').length;

  return (
    <div>
      <PageHeader
        title="Support Tickets"
        description="Tenant support requests — assign, respond, and track SLAs."
        breadcrumbs={[{ label: 'Super Admin', href: '/super-admin/dashboard' }, { label: 'Support' }]}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open tickets" value={open} icon="CircleAlert" tone="danger" />
        <StatCard label="In progress" value={inProgress} icon="Clock3" tone="warning" />
        <StatCard label="Overdue SLA" value={overdue} icon="AlertTriangle" tone="danger" />
        <StatCard label="Resolved" value={resolved} icon="CircleCheck" tone="success" />
      </div>

      <DataTable
        columns={columns}
        data={platformTickets}
        searchKeys={['subject', 'tenant', 'assignee']}
        searchPlaceholder="Search tickets..."
      />
    </div>
  );
}
