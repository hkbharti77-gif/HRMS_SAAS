'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarTrend } from '@/components/shared/charts';
import { compensationData } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/format';

type Comp = (typeof compensationData)[number];

const compByDept = [
  { dept: 'Executive', value: 340000 },
  { dept: 'Engineering', value: 205000 },
  { dept: 'HR', value: 240000 },
  { dept: 'Product', value: 185000 },
  { dept: 'Sales', value: 125000 },
];

export default function CompensationPage() {
  const avgComp = Math.round(compensationData.reduce((s, c) => s + c.totalComp, 0) / compensationData.length);
  const maxComp = Math.max(...compensationData.map((c) => c.totalComp));
  const minComp = Math.min(...compensationData.map((c) => c.totalComp));

  const columns: Column<Comp>[] = [
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
      key: 'designation',
      header: 'Designation',
      cell: (r) => <span className="text-muted-foreground">{r.designation}</span>,
      hideOnMobile: true,
    },
    {
      key: 'baseSalary',
      header: 'Base',
      sortable: true,
      sortValue: (r) => r.baseSalary,
      cell: (r) => <span className="font-medium">{formatCurrency(r.baseSalary)}</span>,
    },
    {
      key: 'bonus',
      header: 'Bonus',
      sortable: true,
      sortValue: (r) => r.bonus,
      cell: (r) => <span className="text-muted-foreground">{formatCurrency(r.bonus)}</span>,
      hideOnMobile: true,
    },
    {
      key: 'equity',
      header: 'Equity',
      cell: (r) => <Badge variant="secondary">{r.equity}</Badge>,
      hideOnMobile: true,
    },
    {
      key: 'totalComp',
      header: 'Total Comp',
      sortable: true,
      sortValue: (r) => r.totalComp,
      cell: (r) => <span className="font-semibold text-brand-600">{formatCurrency(r.totalComp)}</span>,
    },
    {
      key: 'percentile',
      header: 'Percentile',
      sortable: true,
      sortValue: (r) => r.percentile,
      cell: (r) => (
        <div className="flex items-center gap-2">
          <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-brand-600" style={{ width: `${r.percentile}%` }} />
          </div>
          <span className="text-xs font-medium">{r.percentile}%</span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Compensation"
        description="Benchmark salaries, analyze pay distribution, and ensure equitable compensation."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Payroll' }, { label: 'Compensation' }]}
        action={{ label: 'Export', icon: 'Download', variant: 'outline' }}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Average comp" value={formatCurrency(avgComp, 'USD', true)} icon="Coins" tone="brand" />
        <StatCard label="Highest comp" value={formatCurrency(maxComp, 'USD', true)} icon="TrendingUp" tone="success" />
        <StatCard label="Lowest comp" value={formatCurrency(minComp, 'USD', true)} icon="TrendingDown" tone="info" />
      </div>
      <Card className="mb-6">
        <CardHeader className="pb-4"><CardTitle className="text-base">Average Compensation by Department</CardTitle></CardHeader>
        <CardContent>
          <BarTrend data={compByDept} xKey="dept" yKey="value" color="#0d9488" formatter={(v) => formatCurrency(Number(v), 'USD', true)} />
        </CardContent>
      </Card>
      <DataTable
        columns={columns}
        data={compensationData}
        searchKeys={['employeeName', 'designation', 'department']}
        searchPlaceholder="Search compensation..."
        initialSort={{ key: 'totalComp', dir: 'desc' }}
      />
    </div>
  );
}
