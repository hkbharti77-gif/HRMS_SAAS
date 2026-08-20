'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { AreaTrend } from '@/components/shared/charts';
import { payrollRuns, loans, complianceFilings } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';

type PayrollRun = (typeof payrollRuns)[number];

const payrollTrend = [
  { month: 'Feb', value: 1.82 }, { month: 'Mar', value: 1.88 }, { month: 'Apr', value: 1.91 },
  { month: 'May', value: 1.95 }, { month: 'Jun', value: 2.01 }, { month: 'Jul', value: 2.08 },
];

export default function HrManagerPayrollPage() {
  const { toast } = useToast();
  const [runs, setRuns] = React.useState<PayrollRun[]>(payrollRuns);

  const handleRunPayroll = (id: string) => {
    setRuns((prev) => prev.map((r) => r.id === id ? { ...r, status: 'Processing', runOn: new Date().toISOString().slice(0, 10) } : r));
    toast({ title: 'Payroll run started', description: 'Processing payroll for all employees. You will be notified when complete.' });
  };

  const columns: Column<PayrollRun>[] = [
    { key: 'month', header: 'Month', sortable: true, sortValue: (r) => r.month, cell: (r) => <span className="font-medium">{r.month}</span> },
    { key: 'employees', header: 'Employees', sortable: true, sortValue: (r) => r.employees, cell: (r) => <span className="text-sm">{r.employees}</span>, hideOnMobile: true },
    { key: 'net', header: 'Net Pay', sortable: true, sortValue: (r) => r.net, cell: (r) => <span className="font-semibold">{r.net > 0 ? formatCurrency(r.net) : '—'}</span> },
    { key: 'status', header: 'Status', sortable: true, sortValue: (r) => r.status, cell: (r) => <StatusBadge status={r.status} dot /> },
    { key: 'runOn', header: 'Run Date', cell: (r) => <span className="text-muted-foreground">{r.runOn !== '—' ? formatDate(r.runOn, 'short') : '—'}</span>, hideOnMobile: true },
    { key: 'actions', header: '', cell: (r) => r.status === 'Draft' ? (<Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleRunPayroll(r.id)}><Icon name="PlayCircle" className="mr-1.5 h-3.5 w-3.5" />Run</Button>) : null },
  ];

  return (
    <div>
      <PageHeader title="Payroll" description="Manage payroll runs, loans, and compliance filings." breadcrumbs={[{ label: 'HR Manager', href: '/hr-manager/dashboard' }, { label: 'Payroll' }]} />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Monthly payroll" value={formatCurrency(2_084_000, 'USD', true)} icon="Banknote" tone="brand" />
        <StatCard label="Active loans" value={loans.filter((l) => l.status === 'Active').length} icon="HandCoins" tone="info" />
        <StatCard label="Compliance alerts" value={complianceFilings.filter((c) => c.status === 'Action Required').length} icon="AlertTriangle" tone="danger" />
        <StatCard label="Next run" value="Aug 31" icon="CalendarClock" tone="warning" />
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-4"><CardTitle className="text-base">Payroll Cost Trend (in millions)</CardTitle></CardHeader>
        <CardContent><AreaTrend data={payrollTrend} xKey="month" yKey="value" color="#2563eb" /></CardContent>
      </Card>

      <DataTable columns={columns} data={runs} searchKeys={['month', 'status']} searchPlaceholder="Search payroll runs..." initialSort={{ key: 'month', dir: 'desc' }} />
    </div>
  );
}
