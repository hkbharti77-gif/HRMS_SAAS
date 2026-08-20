'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Icon } from '@/components/shared/icon';
import { Button } from '@/components/ui/button';
import { employeeDocuments } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

type Doc = (typeof employeeDocuments)[number];

export default function DocumentsPage() {
  const columns: Column<Doc>[] = [
    {
      key: 'employeeName',
      header: 'Employee',
      sortable: true,
      sortValue: (r) => r.employeeName,
      cell: (r) => (
        <div className="flex items-center gap-2">
          <AvatarBadge name={r.employeeName} size="sm" />
          <span className="font-medium">{r.employeeName}</span>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Document Type',
      sortable: true,
      sortValue: (r) => r.type,
      cell: (r) => <span className="text-sm">{r.type}</span>,
    },
    {
      key: 'fileName',
      header: 'File',
      cell: (r) => (
        <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <Icon name="FileText" className="h-3.5 w-3.5" />
          {r.fileName}
        </span>
      ),
      hideOnMobile: true,
    },
    {
      key: 'uploadedOn',
      header: 'Uploaded',
      sortable: true,
      sortValue: (r) => r.uploadedOn,
      cell: (r) => <span className="text-muted-foreground">{formatDate(r.uploadedOn, 'short')}</span>,
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
        title="Documents"
        description="All employee documents — contracts, IDs, certificates, and more."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'People', href: '/admin/people' }, { label: 'Documents' }]}
        action={{ label: 'Upload document', icon: 'Upload' }}
      />
      <DataTable
        columns={columns}
        data={employeeDocuments}
        searchKeys={['employeeName', 'type', 'fileName']}
        searchPlaceholder="Search documents..."
      />
    </div>
  );
}
