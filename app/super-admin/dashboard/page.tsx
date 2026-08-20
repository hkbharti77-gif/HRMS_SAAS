'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaTrend, BarTrend, DonutChart, RadialGauge } from '@/components/shared/charts';
import { Icon } from '@/components/shared/icon';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatCurrency, relativeTime } from '@/lib/format';
import { tenants, mrrTrend, signupTrend, planDist, systemHealth, platformTickets } from '@/lib/mock-data';
import Link from 'next/link';

export default function SuperAdminDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Platform Dashboard"
        description="Real-time overview of all tenants, revenue, and system health."
        action={{ label: 'Export report', icon: 'Download', variant: 'outline' }}
      />

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total tenants" value="2,418" icon="Building2" trend={{ value: '12.4%', up: true }} tone="brand" footer="vs last month" />
        <StatCard label="Monthly revenue" value="$184.2K" icon="CreditCard" trend={{ value: '8.5%', up: true }} tone="success" footer="MRR" />
        <StatCard label="Active users" value="48.2K" icon="Users" trend={{ value: '5.1%', up: true }} tone="info" footer="across all tenants" />
        <StatCard label="Churn rate" value="2.1%" icon="TrendingUp" trend={{ value: '0.3%', up: false }} tone="warning" footer="this quarter" />
      </div>

      {/* Charts row */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base">Monthly Recurring Revenue</CardTitle>
            <span className="text-sm font-semibold text-success-600">+8.5%</span>
          </CardHeader>
          <CardContent>
            <AreaTrend data={mrrTrend} xKey="month" yKey="value" color="#2563eb" formatter={(v) => `$${v}K`} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart data={planDist} height={200} innerRadius={55} />
            <div className="mt-4 space-y-2">
              {planDist.map((p) => (
                <div key={p.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.fill }} />
                    <span className="text-muted-foreground">{p.name}</span>
                  </div>
                  <span className="font-medium">{p.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second row */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base">New Signups This Year</CardTitle>
            <span className="text-sm font-semibold text-success-600">+61 in July</span>
          </CardHeader>
          <CardContent>
            <BarTrend data={signupTrend} xKey="month" yKey="value" color="#0d9488" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            {systemHealth.slice(0, 5).map((s) => (
              <div key={s.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      s.status === 'Operational' ? 'bg-success-500' : 'bg-warning-500'
                    }`}
                  />
                  <span className="text-sm">{s.service}</span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium">{s.uptime}</p>
                  <p className="text-xs text-muted-foreground">{s.latency}</p>
                </div>
              </div>
            ))}
            <Link href="#" className="block pt-1 text-center text-xs font-medium text-brand-600 hover:underline">
              View all services
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent tenants + support tickets */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base">Recent Tenants</CardTitle>
            <Link href="/super-admin/tenants" className="text-xs font-medium text-brand-600 hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {tenants.slice(0, 5).map((t) => (
              <Link
                key={t.id}
                href={`/super-admin/tenants/${t.id}`}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-accent"
              >
                <AvatarBadge name={t.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{t.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {t.employeeCount} employees · {t.plan}
                  </p>
                </div>
                <StatusBadge status={t.status} dot />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base">Open Support Tickets</CardTitle>
            <Link href="/super-admin/support" className="text-xs font-medium text-brand-600 hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {platformTickets.filter((t) => t.status === 'Open' || t.status === 'In Progress').slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center gap-3 rounded-lg p-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon name="LifeBuoy" className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{t.subject}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.tenant} · {t.sla}</p>
                </div>
                <StatusBadge status={t.priority} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
