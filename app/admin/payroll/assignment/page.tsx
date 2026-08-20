'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { employees, salaryStructures } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/format';

type Row = { id: string; employeeName: string; department: string; structure: string; ctc: number };

const assignmentData: Row[] = employees.slice(0, 15).map((e, i) => ({
  id: `as-${e.id}`,
  employeeName: `${e.firstName} ${e.lastName}`,
  department: e.department,
  structure: salaryStructures[i % salaryStructures.length].name,
  ctc: e.salary,
}));

export default function SalaryAssignmentPage() {
  const columns: Column<Row>[] = [
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
      key: 'department',
      header: 'Department',
      cell: (r) => <span className="text-muted-foreground">{r.department}</span>,
      hideOnMobile: true,
    },
    {
      key: 'structure',
      header: 'Salary Structure',
      sortable: true,
      sortValue: (r) => r.structure,
      cell: (r) => <Badge variant="secondary">{r.structure}</Badge>,
    },
    {
      key: 'ctc',
      header: 'Annual CTC',
      sortable: true,
      sortValue: (r) => r.ctc,
      cell: (r) => <span className="font-medium">{formatCurrency(r.ctc)}</span>,
    },
    {
      key: 'actions',
      header: '',
      cell: () => (
        <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Edit3" className="h-4 w-4" /></Button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Salary Assignment"
        description="Assign salary structures and CTC to individual employees."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Payroll' }, { label: 'Assignment' }]}
      />
      <DataTable
        columns={columns}
        data={assignmentData}
        searchKeys={['employeeName', 'department', 'structure']}
        searchPlaceholder="Search employees..."
      />
    </div>
  );
}
