'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { Icon } from '@/components/shared/icon';
import { platformAuditLogs } from '@/lib/mock-data';
import { formatDate, relativeTime } from '@/lib/format';

type Log = (typeof platformAuditLogs)[number];

export default function AuditLogsPage() {
  const columns: Column<Log>[] = [
    {
      key: 'actor',
      header: 'Actor',
      sortable: true,
      sortValue: (r) => r.actor,
      cell: (r) => (
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-medium">
            {r.actor === 'system' ? 'SY' : r.actor[0].toUpperCase()}
          </div>
          <span className="font-medium">{r.actor}</span>
        </div>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      sortable: true,
      sortValue: (r) => r.action,
      cell: (r) => <span className="font-medium">{r.action}</span>,
    },
    {
      key: 'target',
      header: 'Target',
      cell: (r) => <span className="text-muted-foreground">{r.target}</span>,
    },
    {
      key: 'ip',
      header: 'IP Address',
      cell: (r) => <span className="font-mono text-xs text-muted-foreground">{r.ip}</span>,
      hideOnMobile: true,
    },
    {
      key: 'time',
      header: 'Timestamp',
      sortable: true,
      sortValue: (r) => r.time,
      cell: (r) => (
        <div>
          <p className="text-xs">{formatDate(r.time, 'short')}</p>
          <p className="text-xs text-muted-foreground">{relativeTime(r.time)}</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Audit Logs"
        description="Platform-level security and activity log across all tenants."
        breadcrumbs={[{ label: 'Super Admin', href: '/super-admin/dashboard' }, { label: 'Audit Logs' }]}
        action={{ label: 'Export logs', icon: 'Download', variant: 'outline' }}
      />

      <DataTable
        columns={columns}
        data={platformAuditLogs}
        searchKeys={['actor', 'action', 'target']}
        searchPlaceholder="Search logs..."
        initialSort={{ key: 'time', dir: 'desc' }}
      />
    </div>
  );
}
