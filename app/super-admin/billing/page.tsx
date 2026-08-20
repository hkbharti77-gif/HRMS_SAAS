'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { StatusBadge } from '@/components/shared/status-badge';
import { AreaTrend } from '@/components/shared/charts';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { platformInvoices, mrrTrend, tenants } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/format';

type Invoice = (typeof platformInvoices)[number];

export default function SubscriptionsBillingPage() {
  const columns: Column<Invoice>[] = [
    {
      key: 'tenant',
      header: 'Tenant',
      sortable: true,
      sortValue: (r) => r.tenant,
      cell: (r) => <span className="font-medium">{r.tenant}</span>,
    },
    {
      key: 'plan',
      header: 'Plan',
      cell: (r) => <StatusBadge status={r.plan} tone="brand" />,
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      sortValue: (r) => r.amount,
      cell: (r) => <span className="font-medium">{formatCurrency(r.amount)}</span>,
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      sortValue: (r) => r.date,
      cell: (r) => <span className="text-muted-foreground">{formatDate(r.date)}</span>,
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

  const totalRevenue = platformInvoices.filter((i) => i.status === 'Paid').reduce((s, i) => s + i.amount, 0);
  const pending = platformInvoices.filter((i) => i.status === 'Pending').length;
  const failed = platformInvoices.filter((i) => i.status === 'Failed').length;
  const trials = tenants.filter((t) => t.status === 'trial').length;

  return (
    <div>
      <PageHeader
        title="Subscriptions & Billing"
        description="Invoices, payment status, and revenue across all tenants."
        breadcrumbs={[{ label: 'Super Admin', href: '/super-admin/dashboard' }, { label: 'Billing' }]}
        action={{ label: 'Export invoices', icon: 'Download', variant: 'outline' }}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total revenue" value={formatCurrency(totalRevenue)} icon="CreditCard" tone="success" footer="this month" />
        <StatCard label="Pending invoices" value={pending} icon="Clock3" tone="warning" />
        <StatCard label="Failed payments" value={failed} icon="CircleAlert" tone="danger" />
        <StatCard label="Active trials" value={trials} icon="Clock" tone="info" footer="converting soon" />
      </div>

      <Card className="mt-6">
        <CardHeader className="pb-4"><CardTitle className="text-base">Revenue Trend</CardTitle></CardHeader>
        <CardContent>
          <AreaTrend data={mrrTrend} xKey="month" yKey="value" color="#10b981" formatter={(v) => `$${v}K`} />
        </CardContent>
      </Card>

      <div className="mt-6">
        <DataTable
          columns={columns}
          data={platformInvoices}
          searchKeys={['tenant', 'plan', 'status']}
          searchPlaceholder="Search invoices..."
        />
      </div>
    </div>
  );
}
