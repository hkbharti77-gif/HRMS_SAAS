'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { taxDeclarations } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/format';

type Tax = (typeof taxDeclarations)[number];

export default function TaxDeclarationPage() {
  const columns: Column<Tax>[] = [
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
      key: 'regime',
      header: 'Regime',
      sortable: true,
      sortValue: (r) => r.regime,
      cell: (r) => <span className="text-sm">{r.regime}</span>,
    },
    {
      key: 'investments',
      header: 'Investments',
      sortable: true,
      sortValue: (r) => r.investments,
      cell: (r) => <span className="font-medium">{formatCurrency(r.investments)}</span>,
      hideOnMobile: true,
    },
    {
      key: 'medicalInsurance',
      header: 'Medical Ins.',
      sortable: true,
      sortValue: (r) => r.medicalInsurance,
      cell: (r) => <span className="text-muted-foreground">{formatCurrency(r.medicalInsurance)}</span>,
      hideOnMobile: true,
    },
    {
      key: 'homeLoanInterest',
      header: 'Home Loan Int.',
      sortable: true,
      sortValue: (r) => r.homeLoanInterest,
      cell: (r) => <span className="text-muted-foreground">{formatCurrency(r.homeLoanInterest)}</span>,
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
      key: 'actions',
      header: '',
      cell: (r) =>
        r.status === 'Pending' ? (
          <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Bell" className="h-4 w-4" /></Button>
        ) : null,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Tax Declaration"
        description="Review employee tax declarations, investment proofs, and regime selection."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Payroll' }, { label: 'Tax' }]}
        action={{ label: 'Export', icon: 'Download', variant: 'outline' }}
      />
      <DataTable
        columns={columns}
        data={taxDeclarations}
        searchKeys={['employeeName', 'regime', 'status']}
        searchPlaceholder="Search declarations..."
      />
    </div>
  );
}
