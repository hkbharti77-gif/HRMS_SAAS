'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { employees } from '@/lib/mock-data';
import type { Employee } from '@/lib/types';

export default function EmployeeDirectoryPage() {
  const columns: Column<Employee>[] = [
    {
      key: 'name', header: 'Name', sortable: true, sortValue: (r) => `${r.firstName} ${r.lastName}`,
      cell: (r) => (
        <div className="flex items-center gap-2">
          <AvatarBadge name={`${r.firstName} ${r.lastName}`} size="sm" />
          <div><p className="text-sm font-medium">{r.firstName} {r.lastName}</p><p className="text-xs text-muted-foreground">{r.empCode}</p></div>
        </div>
      ),
    },
    { key: 'designation', header: 'Designation', sortable: true, sortValue: (r) => r.designation, cell: (r) => <span className="text-sm">{r.designation}</span> },
    { key: 'department', header: 'Department', sortable: true, sortValue: (r) => r.department, cell: (r) => <span className="text-muted-foreground text-sm">{r.department}</span>, hideOnMobile: true },
    { key: 'email', header: 'Email', cell: (r) => <span className="text-muted-foreground text-sm">{r.email}</span>, hideOnMobile: true },
    { key: 'status', header: 'Status', sortable: true, sortValue: (r) => r.status, cell: (r) => <StatusBadge status={r.status} dot /> },
  ];

  return (
    <div>
      <PageHeader
        title="Directory"
        description="Browse and search colleagues across the company."
        breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Directory' }]}
      />
      <DataTable columns={columns} data={employees} searchKeys={['firstName', 'lastName', 'designation', 'department', 'email']} searchPlaceholder="Search colleagues..." />
    </div>
  );
}
