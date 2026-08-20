'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { Badge } from '@/components/ui/badge';
import { designations } from '@/lib/mock-data';

type Designation = (typeof designations)[number];

export default function DesignationsPage() {
  const [list, setList] = React.useState(designations);

  const columns: Column<Designation>[] = [
    {
      key: 'title',
      header: 'Title',
      sortable: true,
      sortValue: (r) => r.title,
      cell: (r) => <span className="font-medium">{r.title}</span>,
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
      sortValue: (r) => r.department,
      cell: (r) => <span className="text-muted-foreground">{r.department}</span>,
    },
    {
      key: 'level',
      header: 'Level',
      sortable: true,
      sortValue: (r) => r.level,
      cell: (r) => <Badge variant="secondary">{r.level}</Badge>,
      hideOnMobile: true,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Designations"
        description="Define job titles and their levels across departments."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Organization' }, { label: 'Designations' }]}
        action={{ label: 'Add designation', icon: 'Plus' }}
      />
      <DataTable
        columns={columns}
        data={list}
        searchKeys={['title', 'department', 'level']}
        searchPlaceholder="Search designations..."
      />
    </div>
  );
}
