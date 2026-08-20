'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { offers } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/format';

type Offer = (typeof offers)[number];

export default function OffersPage() {
  const sent = offers.filter((o) => o.status === 'Sent').length;
  const accepted = offers.filter((o) => o.status === 'Accepted').length;
  const pending = offers.filter((o) => o.status === 'Pending Approval' || o.status === 'Draft').length;

  const columns: Column<Offer>[] = [
    {
      key: 'candidate',
      header: 'Candidate',
      sortable: true,
      sortValue: (r) => r.candidate,
      cell: (r) => (
        <div className="flex items-center gap-2">
          <AvatarBadge name={r.candidate} size="sm" />
          <span className="font-medium">{r.candidate}</span>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      cell: (r) => <span className="text-muted-foreground">{r.role}</span>,
      hideOnMobile: true,
    },
    {
      key: 'department',
      header: 'Department',
      cell: (r) => <span className="text-muted-foreground">{r.department}</span>,
      hideOnMobile: true,
    },
    {
      key: 'salary',
      header: 'Base Salary',
      sortable: true,
      sortValue: (r) => r.salary,
      cell: (r) => <span className="font-medium">{formatCurrency(r.salary)}</span>,
    },
    {
      key: 'bonus',
      header: 'Bonus',
      sortable: true,
      sortValue: (r) => r.bonus,
      cell: (r) => <span className="text-muted-foreground">{formatCurrency(r.bonus)}</span>,
      hideOnMobile: true,
    },
    {
      key: 'equity',
      header: 'Equity',
      cell: (r) => <span className="text-muted-foreground">{r.equity}</span>,
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
      key: 'actions',
      header: '',
      cell: (r) =>
        r.status === 'Draft' || r.status === 'Pending Approval' ? (
          <Button variant="outline" size="sm"><Icon name="Send" className="mr-1.5 h-3.5 w-3.5" />Send</Button>
        ) : null,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Offers"
        description="Track offer letters, compensation packages, and candidate responses."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Hiring' }, { label: 'Offers' }]}
        action={{ label: 'Create offer', icon: 'Plus' }}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Pending approval" value={pending} icon="Clock3" tone="warning" />
        <StatCard label="Sent" value={sent} icon="Send" tone="brand" footer="awaiting response" />
        <StatCard label="Accepted" value={accepted} icon="CircleCheck" tone="success" />
      </div>
      <DataTable
        columns={columns}
        data={offers}
        searchKeys={['candidate', 'role', 'department', 'status']}
        searchPlaceholder="Search offers..."
      />
    </div>
  );
}
