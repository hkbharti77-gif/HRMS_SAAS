'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaTrend, BarTrend, DonutChart, MultiAreaTrend } from '@/components/shared/charts';
import { mrrTrend, signupTrend, planDist, moduleAdoption, headcountTrend } from '@/lib/mock-data';

const activeVsDormant = [
  { month: 'Feb', active: 1820, dormant: 410 },
  { month: 'Mar', active: 1890, dormant: 430 },
  { month: 'Apr', active: 1980, dormant: 440 },
  { month: 'May', active: 2060, dormant: 450 },
  { month: 'Jun', active: 2150, dormant: 460 },
  { month: 'Jul', active: 2240, dormant: 178 },
];

export default function PlatformAnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Platform Analytics"
        description="Usage trends, module adoption, and tenant activity across the platform."
        breadcrumbs={[{ label: 'Super Admin', href: '/super-admin/dashboard' }, { label: 'Analytics' }]}
        action={{ label: 'Export', icon: 'Download', variant: 'outline' }}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Avg tenants/da" value="22.4K" icon="Users" trend={{ value: '6%', up: true }} tone="brand" />
        <StatCard label="Module adoption" value="61%" icon="Box" trend={{ value: '3%', up: true }} tone="success" />
        <StatCard label="Dormant tenants" value="178" icon="Clock" trend={{ value: '12%', up: false }} tone="warning" footer="no login in 30d" />
        <StatCard label="Conversion rate" value="14.2%" icon="TrendingUp" trend={{ value: '1.8%', up: true }} tone="info" footer="trial → paid" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4"><CardTitle className="text-base">Active vs Dormant Tenants</CardTitle></CardHeader>
          <CardContent>
            <MultiAreaTrend
              data={activeVsDormant}
              xKey="month"
              series={[
                { key: 'active', name: 'Active', color: '#2563eb' },
                { key: 'dormant', name: 'Dormant', color: '#f59e0b' },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4"><CardTitle className="text-base">Plan Distribution</CardTitle></CardHeader>
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

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-4"><CardTitle className="text-base">Signups Trend</CardTitle></CardHeader>
          <CardContent>
            <BarTrend data={signupTrend} xKey="month" yKey="value" color="#0d9488" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4"><CardTitle className="text-base">Module Adoption Rate</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {moduleAdoption.slice(0, 8).map((m) => (
                <div key={m.module}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium">{m.module}</span>
                    <span className="text-muted-foreground">{m.pct}% · {m.tenants.toLocaleString()}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-brand-600 transition-all"
                      style={{ width: `${m.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
