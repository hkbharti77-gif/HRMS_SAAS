'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { FormDrawer } from '@/components/shared/form-drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { departments } from '@/lib/mock-data';
import { formatNumber } from '@/lib/format';
import type { Department } from '@/lib/types';

export default function DepartmentsPage() {
  const [open, setOpen] = React.useState(false);
  const [deptList, setDeptList] = React.useState(departments);

  const columns: Column<Department>[] = [
    {
      key: 'name',
      header: 'Department',
      sortable: true,
      sortValue: (r) => r.name,
      cell: (r) => <span className="font-medium">{r.name}</span>,
    },
    {
      key: 'head',
      header: 'Department Head',
      cell: (r) => (
        <div className="flex items-center gap-2">
          <AvatarBadge name={r.head} size="sm" />
          <span className="text-sm">{r.head}</span>
        </div>
      ),
      hideOnMobile: true,
    },
    {
      key: 'headcount',
      header: 'Headcount',
      sortable: true,
      sortValue: (r) => r.headcount,
      cell: (r) => <span className="font-medium">{formatNumber(r.headcount)}</span>,
    },
    {
      key: 'parent',
      header: 'Reports To',
      cell: (r) => <span className="text-muted-foreground">{r.parent ?? '—'}</span>,
      hideOnMobile: true,
    },
    {
      key: 'description',
      header: 'Description',
      cell: (r) => <span className="text-muted-foreground line-clamp-1">{r.description}</span>,
      hideOnMobile: true,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Departments"
        description="Organize your company into departments and teams."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Organization' }, { label: 'Departments' }]}
        action={{ label: 'Add department', icon: 'Plus', onClick: () => setOpen(true) }}
      />
      <DataTable
        columns={columns}
        data={deptList}
        searchKeys={['name', 'head', 'parent']}
        searchPlaceholder="Search departments..."
      />
      <FormDrawer
        open={open}
        onOpenChange={setOpen}
        title="Add Department"
        description="Create a new department or team."
        onSubmit={() => setOpen(false)}
        submitLabel="Create"
      >
        <div className="space-y-2">
          <Label>Department name</Label>
          <Input placeholder="e.g. Customer Success" />
        </div>
        <div className="space-y-2">
          <Label>Department head</Label>
          <Input placeholder="Search employee..." />
        </div>
        <div className="space-y-2">
          <Label>Reports to (parent)</Label>
          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            <option>None</option>
            {deptList.map((d) => <option key={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <textarea className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Brief description..." />
        </div>
      </FormDrawer>
    </div>
  );
}
