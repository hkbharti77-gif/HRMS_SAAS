'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaTrend, DonutChart } from '@/components/shared/charts';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { expenseClaims, expenseTrend, expenseByCategory } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/format';

export default function ExpensesDashboardPage() {
  const total = expenseClaims.reduce((s, e) => s + e.amount, 0);
  const pending = expenseClaims.filter((e) => e.status === 'Pending').length;
  const reimbursed = expenseClaims.filter((e) => e.status === 'Reimbursed').reduce((s, e) => s + e.amount, 0);

  return (
    <div>
      <PageHeader
        title="Expenses Dashboard"
        description="Track company spending, approvals, and reimbursement status."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Expenses' }]}
        action={{ label: 'New expense', icon: 'Plus', href: '/admin/expenses/approvals' }}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total spend" value={formatCurrency(total, 'USD', true)} icon="Wallet" tone="brand" footer="this month" />
        <StatCard label="Reimbursed" value={formatCurrency(reimbursed, 'USD', true)} icon="CircleCheck" tone="success" />
        <StatCard label="Pending approval" value={pending} icon="Clock3" tone="warning" footer="claims" />
        <StatCard label="Avg claim" value={formatCurrency(Math.round(total / expenseClaims.length), 'USD', true)} icon="Receipt" tone="info" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4"><CardTitle className="text-base">Monthly Expense Trend</CardTitle></CardHeader>
          <CardContent>
            <AreaTrend data={expenseTrend} xKey="month" yKey="value" color="#2563eb" formatter={(v) => formatCurrency(Number(v), 'USD', true)} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4"><CardTitle className="text-base">By Category</CardTitle></CardHeader>
          <CardContent>
            <DonutChart data={expenseByCategory} height={200} innerRadius={55} />
            <div className="mt-4 space-y-2">
              {expenseByCategory.map((d) => (
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
          <CardTitle className="text-base">Recent Claims</CardTitle>
          <a href="/admin/expenses/approvals" className="text-xs text-muted-foreground hover:text-foreground">View all</a>
        </CardHeader>
        <CardContent className="space-y-3">
          {expenseClaims.slice(0, 5).map((e) => (
            <div key={e.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <AvatarBadge name={e.employeeName} size="sm" />
                <div>
                  <p className="text-sm font-medium">{e.category}</p>
                  <p className="text-xs text-muted-foreground">{e.employeeName} · {formatDate(e.date, 'short')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">{formatCurrency(e.amount)}</span>
                <StatusBadge status={e.status} dot />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
