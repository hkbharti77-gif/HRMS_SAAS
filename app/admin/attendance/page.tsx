'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarTrend, DonutChart } from '@/components/shared/charts';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { attendance, attendanceTrend, employees } from '@/lib/mock-data';

const statusDist = [
  { name: 'Present', value: 298, fill: '#0d9488' },
  { name: 'WFH', value: 22, fill: '#2563eb' },
  { name: 'Late', value: 12, fill: '#f59e0b' },
  { name: 'On Leave', value: 8, fill: '#8b5cf6' },
  { name: 'Absent', value: 2, fill: '#ef4444' },
];

const lateArrivals = [
  { id: 'la1', name: 'Tom Reyes', time: '09:42', dept: 'Operations' },
  { id: 'la2', name: 'Sophie Dubois', time: '09:28', dept: 'Design' },
  { id: 'la3', name: 'Mei Wang', time: '09:15', dept: 'Finance' },
];

export default function AttendanceDashboardPage() {
  const present = attendance.filter((a) => a.status === 'Present').length;
  const wfh = attendance.filter((a) => a.status === 'WFH').length;
  const late = attendance.filter((a) => a.status === 'Late').length;
  const absent = attendance.filter((a) => a.status === 'Absent').length;
  const rate = Math.round(((present + wfh) / employees.length) * 100);

  return (
    <div>
      <PageHeader
        title="Attendance Dashboard"
        description="Track daily attendance, punctuality, and patterns across your workforce."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Attendance' }]}
        action={{ label: 'Export', icon: 'Download', variant: 'outline' }}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Attendance rate" value={`${rate}%`} icon="Percent" trend={{ value: '2%', up: true }} tone="success" footer={`${present + wfh} present`} />
        <StatCard label="On time" value={present} icon="Clock" tone="brand" footer={`${Math.round((present / employees.length) * 100)}% of workforce`} />
        <StatCard label="Late arrivals" value={late} icon="Timer" tone="warning" footer="today" />
        <StatCard label="Absent" value={absent} icon="UserX" tone="danger" footer="today" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4"><CardTitle className="text-base">Weekly Attendance Trend</CardTitle></CardHeader>
          <CardContent>
            <BarTrend data={attendanceTrend} xKey="day" yKey="present" color="#0d9488" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4"><CardTitle className="text-base">Today's Status</CardTitle></CardHeader>
          <CardContent>
            <DonutChart data={statusDist} height={200} innerRadius={55} />
            <div className="mt-4 space-y-2">
              {statusDist.map((d) => (
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
        <CardHeader className="pb-4"><CardTitle className="text-base">Late Arrivals Today</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {lateArrivals.map((l) => (
            <div key={l.id} className="flex items-center gap-3 rounded-lg border p-3">
              <AvatarBadge name={l.name} size="sm" />
              <div className="flex-1">
                <p className="text-sm font-medium">{l.name}</p>
                <p className="text-xs text-muted-foreground">{l.dept}</p>
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-warning-600">
                <Icon name="Timer" className="h-4 w-4" />
                {l.time}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
