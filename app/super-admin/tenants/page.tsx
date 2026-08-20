'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { tenants } from '@/lib/mock-data';
import { formatCurrency, formatDate, formatNumber } from '@/lib/format';
import type { Tenant } from '@/lib/types';

export default function TenantsListPage() {
  const columns: Column<Tenant>[] = [
    {
      key: 'name',
      header: 'Company',
      sortable: true,
      sortValue: (r) => r.name,
      cell: (r) => (
        <div className="flex items-center gap-3">
          <AvatarBadge name={r.name} size="sm" />
          <div className="min-w-0">
            <p className="truncate font-medium">{r.name}</p>
            <p className="truncate text-xs text-muted-foreground">{r.domain}.peoplepilot.com</p>
          </div>
        </div>
      ),
    },
    {
      key: 'plan',
      header: 'Plan',
      sortable: true,
      sortValue: (r) => r.plan,
      cell: (r) => <StatusBadge status={r.plan} tone="brand" />,
    },
    {
      key: 'employeeCount',
      header: 'Employees',
      sortable: true,
      sortValue: (r) => r.employeeCount,
      cell: (r) => <span className="font-medium">{formatNumber(r.employeeCount)}</span>,
      hideOnMobile: true,
    },
    {
      key: 'industry',
      header: 'Industry',
      cell: (r) => <span className="text-muted-foreground">{r.industry}</span>,
      hideOnMobile: true,
    },
    {
      key: 'mrr',
      header: 'MRR',
      sortable: true,
      sortValue: (r) => r.mrr,
      cell: (r) => (
        <span className={r.mrr > 0 ? 'font-medium' : 'text-muted-foreground'}>
          {r.mrr > 0 ? formatCurrency(r.mrr) : '—'}
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

  return (
    <div>
      <PageHeader
        title="Tenants"
        description="All companies on the platform — search, filter, and manage."
        breadcrumbs={[{ label: 'Super Admin', href: '/super-admin/dashboard' }, { label: 'Tenants' }]}
        action={{ label: 'Add tenant', icon: 'Plus', href: '/super-admin/tenants/new' }}
      />
      <DataTable
        columns={columns}
        data={tenants}
        searchKeys={['name', 'domain', 'industry']}
        searchPlaceholder="Search tenants..."
        rowHref={(r) => `/super-admin/tenants/${r.id}`}
        toolbar={
          <Button variant="outline" size="sm">
            <Icon name="Filter" className="mr-2 h-4 w-4" />
            Filter
          </Button>
        }
      />
    </div>
  );
}
