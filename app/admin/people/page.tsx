'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { employees } from '@/lib/mock-data';
import { formatDate, formatNumber } from '@/lib/format';
import type { Employee } from '@/lib/types';

export default function PeopleDirectoryPage() {
  const [view, setView] = React.useState<'table' | 'grid'>('table');

  const columns: Column<Employee>[] = [
    {
      key: 'name',
      header: 'Employee',
      sortable: true,
      sortValue: (r) => `${r.firstName} ${r.lastName}`,
      cell: (r) => (
        <div className="flex items-center gap-3">
          <AvatarBadge name={`${r.firstName} ${r.lastName}`} size="sm" />
          <div className="min-w-0">
            <p className="truncate font-medium">{r.firstName} {r.lastName}</p>
            <p className="truncate text-xs text-muted-foreground">{r.empCode}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'designation',
      header: 'Designation',
      sortable: true,
      sortValue: (r) => r.designation,
      cell: (r) => <span className="text-sm">{r.designation}</span>,
      hideOnMobile: true,
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
      key: 'status',
      header: 'Status',
      sortable: true,
      sortValue: (r) => r.status,
      cell: (r) => <StatusBadge status={r.status} dot />,
    },
    {
      key: 'joinDate',
      header: 'Joined',
      sortable: true,
      sortValue: (r) => r.joinDate,
      cell: (r) => <span className="text-muted-foreground">{formatDate(r.joinDate, 'short')}</span>,
      hideOnMobile: true,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Employee Directory"
        description={`${employees.length} employees across your organization.`}
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'People' }, { label: 'Directory' }]}
        action={{ label: 'Add employee', icon: 'UserPlus', href: '/admin/people/add' }}
      />
      <DataTable
        columns={columns}
        data={employees}
        searchKeys={['firstName', 'lastName', 'empCode', 'department', 'designation', 'email']}
        searchPlaceholder="Search by name, code, department..."
        rowHref={(r) => `/admin/people/${r.id}`}
        toolbar={
          <div className="flex items-center gap-1 rounded-lg border p-1">
            <Button variant={view === 'table' ? 'secondary' : 'ghost'} size="sm" className="h-7 px-2" onClick={() => setView('table')}>
              <Icon name="List" className="h-4 w-4" />
            </Button>
            <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="sm" className="h-7 px-2" onClick={() => setView('grid')}>
              <Icon name="LayoutGrid" className="h-4 w-4" />
            </Button>
          </div>
        }
      />
    </div>
  );
}
