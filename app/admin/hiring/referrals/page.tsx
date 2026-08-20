'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/shared/icon';
import { referrals } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/format';

type Referral = (typeof referrals)[number];

export default function ReferralsPage() {
  const total = referrals.length;
  const hired = referrals.filter((r) => r.status === 'Hired').length;
  const bonusPaid = referrals.reduce((s, r) => s + (r.bonusPaid ?? 0), 0);

  const columns: Column<Referral>[] = [
    {
      key: 'referrer',
      header: 'Referrer',
      sortable: true,
      sortValue: (r) => r.referrer,
      cell: (r) => (
        <div className="flex items-center gap-2">
          <AvatarBadge name={r.referrer} size="sm" />
          <span className="font-medium">{r.referrer}</span>
        </div>
      ),
    },
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
      key: 'date',
      header: 'Referred on',
      sortable: true,
      sortValue: (r) => r.date,
      cell: (r) => <span className="text-muted-foreground">{formatDate(r.date, 'short')}</span>,
      hideOnMobile: true,
    },
    {
      key: 'bonusEligible',
      header: 'Bonus',
      cell: (r) =>
        r.bonusEligible ? (
          <Badge variant="secondary" className="border-success-200 bg-success-50 text-success-700 dark:border-success-800 dark:bg-success-500/10 dark:text-success-300">
            {r.bonusPaid ? formatCurrency(r.bonusPaid) : 'Eligible'}
          </Badge>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        ),
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
        title="Referrals"
        description="Track employee referrals, candidate status, and referral bonus payouts."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Hiring' }, { label: 'Referrals' }]}
        action={{ label: 'Refer someone', icon: 'Share2' }}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total referrals" value={total} icon="Share2" tone="brand" />
        <StatCard label="Hired" value={hired} icon="CircleCheck" tone="success" />
        <StatCard label="Bonus paid" value={formatCurrency(bonusPaid, 'USD', true)} icon="Coins" tone="info" />
      </div>
      <DataTable
        columns={columns}
        data={referrals}
        searchKeys={['referrer', 'candidate', 'role', 'status']}
        searchPlaceholder="Search referrals..."
        initialSort={{ key: 'date', dir: 'desc' }}
      />
    </div>
  );
}
