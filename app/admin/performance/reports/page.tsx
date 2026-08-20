'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/shared/stat-card';
import { AreaTrend, DonutChart } from '@/components/shared/charts';
import { performanceScoreTrend, performanceDist } from '@/lib/mock-data';

export default function PerformanceReportsPage() {
  const avgScore = (performanceScoreTrend.reduce((s, p) => s + p.score, 0) / performanceScoreTrend.length).toFixed(1);
  const exceeds = performanceDist[0].value;
  const below = performanceDist[3].value + performanceDist[4].value;

  return (
    <div>
      <PageHeader
        title="Performance Reports"
        description="Organization-wide performance analytics and rating distributions."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Performance' }, { label: 'Reports' }]}
        action={{ label: 'Export', icon: 'Download', variant: 'outline' }}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Avg score" value={`${avgScore}/5`} icon="Star" tone="brand" footer="all cycles" />
        <StatCard label="Exceeds expectations" value={exceeds} icon="TrendingUp" tone="success" footer="employees" />
        <StatCard label="Needs improvement" value={below} icon="TrendingDown" tone="danger" footer="employees" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4"><CardTitle className="text-base">Performance Score Trend</CardTitle></CardHeader>
          <CardContent>
            <AreaTrend data={performanceScoreTrend} xKey="cycle" yKey="score" color="#2563eb" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4"><CardTitle className="text-base">Rating Distribution</CardTitle></CardHeader>
          <CardContent>
            <DonutChart data={performanceDist} height={200} innerRadius={55} />
            <div className="mt-4 space-y-2">
              {performanceDist.map((d) => (
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

      <Card className="mt-4">
        <CardHeader className="pb-4"><CardTitle className="text-base">Department Performance Summary</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Department</th>
                  <th className="pb-3 pr-4 font-medium">Avg Score</th>
                  <th className="pb-3 pr-4 font-medium">Exceeds</th>
                  <th className="pb-3 pr-4 font-medium">Meets</th>
                  <th className="pb-3 font-medium">Below</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { dept: 'Engineering', avg: 4.3, exc: 18, meet: 42, below: 4 },
                  { dept: 'Sales', avg: 3.9, exc: 8, meet: 24, below: 6 },
                  { dept: 'Product', avg: 4.2, exc: 6, meet: 14, below: 2 },
                  { dept: 'Operations', avg: 3.8, exc: 5, meet: 20, below: 5 },
                  { dept: 'HR', avg: 4.0, exc: 4, meet: 10, below: 2 },
                  { dept: 'Finance', avg: 4.1, exc: 4, meet: 8, below: 1 },
                ].map((r) => (
                  <tr key={r.dept} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium">{r.dept}</td>
                    <td className="py-3 pr-4"><span className="font-semibold text-brand-600">{r.avg}</span></td>
                    <td className="py-3 pr-4 text-success-600">{r.exc}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{r.meet}</td>
                    <td className="py-3 text-danger-600">{r.below}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
