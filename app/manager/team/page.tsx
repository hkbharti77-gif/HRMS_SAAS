'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { employees } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import type { Employee } from '@/lib/types';

export default function ManagerTeamPage() {
  const team = employees.filter((e) => e.manager === 'Sarah Chen');

  const columns: Column<Employee>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      sortValue: (r) => `${r.firstName} ${r.lastName}`,
      cell: (r) => (
        <div className="flex items-center gap-2">
          <AvatarBadge name={`${r.firstName} ${r.lastName}`} size="sm" />
          <div>
            <p className="text-sm font-medium">{r.firstName} {r.lastName}</p>
            <p className="text-xs text-muted-foreground">{r.empCode}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'designation',
      header: 'Role',
      sortable: true,
      sortValue: (r) => r.designation,
      cell: (r) => <span className="text-sm">{r.designation}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      sortValue: (r) => r.status,
      cell: (r) => <StatusBadge status={r.status} dot />,
    },
    {
      key: 'location',
      header: 'Location',
      sortable: true,
      sortValue: (r) => r.location,
      cell: (r) => <span className="text-muted-foreground text-sm">{r.location}</span>,
      hideOnMobile: true,
    },
    {
      key: 'joinDate',
      header: 'Joined',
      sortable: true,
      sortValue: (r) => r.joinDate,
      cell: (r) => <span className="text-muted-foreground text-sm">{formatDate(r.joinDate, 'short')}</span>,
      hideOnMobile: true,
    },
    {
      key: 'actions',
      header: '',
      cell: () => (
        <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Eye" className="h-4 w-4" /></Button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="My Team"
        description="View and manage your direct reports."
        breadcrumbs={[{ label: 'Manager', href: '/manager/dashboard' }, { label: 'My Team' }]}
      />
      <DataTable
        columns={columns}
        data={team}
        searchKeys={['firstName', 'lastName', 'designation', 'status', 'location']}
        searchPlaceholder="Search team members..."
      />
    </div>
  );
}
