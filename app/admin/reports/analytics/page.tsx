'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaTrend, DonutChart } from '@/components/shared/charts';
import { formatCurrency } from '@/lib/format';

const headcountTrend = [
  { month: 'Feb', value: 318 },
  { month: 'Mar', value: 322 },
  { month: 'Apr', value: 328 },
  { month: 'May', value: 335 },
  { month: 'Jun', value: 339 },
  { month: 'Jul', value: 342 },
];

const deptDist = [
  { name: 'Engineering', value: 120, fill: '#2563eb' },
  { name: 'Sales', value: 48, fill: '#0d9488' },
  { name: 'Operations', value: 42, fill: '#f59e0b' },
  { name: 'HR', value: 18, fill: '#ec4899' },
  { name: 'Finance', value: 15, fill: '#8b5cf6' },
  { name: 'Design', value: 22, fill: '#06b6d4' },
];

export default function ReportsAnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Organization-wide analytics dashboard with key metrics."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Reports' }, { label: 'Analytics' }]}
        action={{ label: 'Export', icon: 'Download', variant: 'outline' }}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Headcount" value={342} icon="Users" tone="brand" footer="+24 YTD" />
        <StatCard label="Attrition rate" value="8.2%" icon="TrendingDown" tone="danger" footer="rolling 12mo" />
        <StatCard label="Avg tenure" value="3.4yr" icon="Clock3" tone="info" />
        <StatCard label="Annual payroll" value={formatCurrency(4120000, 'USD', true)} icon="Banknote" tone="success" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4"><CardTitle className="text-base">Headcount Growth</CardTitle></CardHeader>
          <CardContent>
            <AreaTrend data={headcountTrend} xKey="month" yKey="value" color="#2563eb" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4"><CardTitle className="text-base">By Department</CardTitle></CardHeader>
          <CardContent>
            <DonutChart data={deptDist} height={200} innerRadius={55} />
            <div className="mt-4 space-y-2">
              {deptDist.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.fill }} />
                    <span className="text-muted-foreground">{d.name}</span>
                  </div>
                  <span className="font-medium">{d.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
