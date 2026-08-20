'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaTrend, DonutChart } from '@/components/shared/charts';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { StatusBadge } from '@/components/shared/status-badge';
import { payrollRuns, payrollCostBreakdown, payslips } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/format';

const payrollTrend = [
  { month: 'Mar', value: 1980000 },
  { month: 'Apr', value: 2010000 },
  { month: 'May', value: 2028000 },
  { month: 'Jun', value: 2051000 },
  { month: 'Jul', value: 2084000 },
  { month: 'Aug', value: 2102000 },
];

export default function PayrollDashboardPage() {
  const latestRun = payrollRuns.find((r) => r.status === 'Completed');
  const pendingPayslips = payslips.filter((p) => p.status === 'Pending').length;

  return (
    <div>
      <PageHeader
        title="Payroll Dashboard"
        description="Track payroll runs, cost breakdowns, and disbursement status."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Payroll' }]}
        action={{ label: 'Run payroll', icon: 'PlayCircle', href: '/admin/payroll/run' }}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Last payroll (net)" value={formatCurrency(latestRun?.net ?? 0, 'USD', true)} icon="Banknote" tone="brand" footer={latestRun?.month} />
        <StatCard label="Gross this month" value={formatCurrency(latestRun?.gross ?? 0, 'USD', true)} icon="Coins" tone="info" footer={`${latestRun?.employees} employees`} />
        <StatCard label="Total deductions" value={formatCurrency(latestRun?.deductions ?? 0, 'USD', true)} icon="Minus" tone="warning" footer="taxes + benefits" />
        <StatCard label="Pending payslips" value={pendingPayslips} icon="ReceiptText" tone="danger" footer="awaiting generation" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4"><CardTitle className="text-base">Payroll Cost Trend</CardTitle></CardHeader>
          <CardContent>
            <AreaTrend data={payrollTrend} xKey="month" yKey="value" color="#2563eb" formatter={(v) => formatCurrency(Number(v), 'USD', true)} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4"><CardTitle className="text-base">Cost Breakdown</CardTitle></CardHeader>
          <CardContent>
            <DonutChart data={payrollCostBreakdown} height={200} innerRadius={55} />
            <div className="mt-4 space-y-2">
              {payrollCostBreakdown.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.fill }} />
                    <span className="text-muted-foreground">{d.name}</span>
                  </div>
                  <span className="font-medium">{formatCurrency(d.value, 'USD', true)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base">Recent Payroll Runs</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs">View all</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {payrollRuns.slice(0, 4).map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                  <Icon name="Banknote" className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{r.month}</p>
                  <p className="text-xs text-muted-foreground">{r.employees} employees · {r.runOn !== '—' ? formatDate(r.runOn, 'short') : 'Not run yet'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{formatCurrency(r.net, 'USD', true)}</p>
                  <p className="text-xs text-muted-foreground">net pay</p>
                </div>
                <StatusBadge status={r.status} dot />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
