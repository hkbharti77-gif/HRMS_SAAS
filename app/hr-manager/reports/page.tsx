'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaTrend, DonutChart } from '@/components/shared/charts';
import { employees, attendanceTrend, departmentDist } from '@/lib/mock-data';

const headcountTrend = [
  { month: 'Feb', value: 305 }, { month: 'Mar', value: 312 }, { month: 'Apr', value: 318 },
  { month: 'May', value: 325 }, { month: 'Jun', value: 331 }, { month: 'Jul', value: 342 },
];
const attritionTrend = [
  { month: 'Feb', value: 9.1 }, { month: 'Mar', value: 7.8 }, { month: 'Apr', value: 10.2 },
  { month: 'May', value: 9.5 }, { month: 'Jun', value: 8.9 }, { month: 'Jul', value: 9.2 },
];

export default function HrManagerReportsPage() {
  const departments = Array.from(new Set(employees.map((e) => e.department)));
  const deptHeadcount = departments.map((d) => ({ dept: d, count: employees.filter((e) => e.department === d).length }));

  return (
    <div>
      <PageHeader title="Reports & Analytics" description="HR metrics across headcount, attrition, attendance, and more." breadcrumbs={[{ label: 'HR Manager', href: '/hr-manager/dashboard' }, { label: 'Reports' }]} />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total headcount" value={342} icon="Users" tone="brand" footer="+12 this quarter" />
        <StatCard label="Attrition rate" value="9.2%" icon="TrendingDown" tone="warning" footer="rolling 12 months" />
        <StatCard label="Avg attendance" value="93.5%" icon="CalendarCheck" tone="success" />
        <StatCard label="Open positions" value="18" icon="Briefcase" tone="info" footer="across 6 depts" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-4"><CardTitle className="text-base">Headcount Growth</CardTitle></CardHeader>
          <CardContent><AreaTrend data={headcountTrend} xKey="month" yKey="value" color="#2563eb" /></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4"><CardTitle className="text-base">Attrition Rate (%)</CardTitle></CardHeader>
          <CardContent><AreaTrend data={attritionTrend} xKey="month" yKey="value" color="#ef4444" /></CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-4"><CardTitle className="text-base">Department Distribution</CardTitle></CardHeader>
          <CardContent><DonutChart data={departmentDist} height={220} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Headcount by Department</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {deptHeadcount.map((d) => (
              <div key={d.dept} className="flex items-center gap-3">
                <span className="w-32 text-sm">{d.dept}</span>
                <div className="h-6 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-brand-500" style={{ width: `${(d.count / employees.length) * 100}%` }} /></div>
                <span className="w-8 text-right text-sm font-medium">{d.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
