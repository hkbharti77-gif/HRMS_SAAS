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
import { leaveRequests, leavePolicies, employees } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

const leaveTrend = [
  { day: 'Mon', casual: 3, sick: 2, earned: 1 },
  { day: 'Tue', casual: 2, sick: 4, earned: 0 },
  { day: 'Wed', casual: 5, sick: 1, earned: 2 },
  { day: 'Thu', casual: 2, sick: 3, earned: 1 },
  { day: 'Fri', casual: 4, sick: 2, earned: 3 },
  { day: 'Sat', casual: 1, sick: 0, earned: 0 },
  { day: 'Sun', casual: 0, sick: 0, earned: 0 },
];

const leaveTypeDist = [
  { name: 'Casual', value: 17, fill: '#2563eb' },
  { name: 'Sick', value: 12, fill: '#0d9488' },
  { name: 'Earned', value: 7, fill: '#f59e0b' },
  { name: 'Unpaid', value: 3, fill: '#64748b' },
];

export default function LeaveDashboardPage() {
  const pending = leaveRequests.filter((l) => l.status === 'Pending').length;
  const onLeaveToday = employees.filter((e) => e.status === 'on-leave').length || 8;
  const totalAllocated = leavePolicies.reduce((s, p) => s + p.allocation, 0);

  return (
    <div>
      <PageHeader
        title="Leave Dashboard"
        description="Monitor leave usage, pending approvals, and team availability."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Leave' }]}
        action={{ label: 'Export', icon: 'Download', variant: 'outline' }}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="On leave today" value={onLeaveToday} icon="CalendarOff" tone="info" footer={`${employees.length - onLeaveToday} available`} />
        <StatCard label="Pending approvals" value={pending} icon="CheckSquare" tone="warning" footer="awaiting review" />
        <StatCard label="Leave types" value={leavePolicies.length} icon="BookOpen" tone="brand" footer={`${totalAllocated} total days/yr`} />
        <StatCard label="Approved this month" value={leaveRequests.filter((l) => l.status === 'Approved').length} icon="CircleCheck" tone="success" footer="requests" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4"><CardTitle className="text-base">Leave Trend This Week</CardTitle></CardHeader>
          <CardContent>
            <BarTrend data={leaveTrend} xKey="day" yKey="casual" color="#2563eb" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4"><CardTitle className="text-base">Leave by Type</CardTitle></CardHeader>
          <CardContent>
            <DonutChart data={leaveTypeDist} height={200} innerRadius={55} />
            <div className="mt-4 space-y-2">
              {leaveTypeDist.map((d) => (
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
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base">Pending Leave Requests</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs" >View all</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {leaveRequests.filter((l) => l.status === 'Pending').slice(0, 5).map((l) => (
            <div key={l.id} className="flex items-center gap-3 rounded-lg border p-3">
              <AvatarBadge name={l.employeeName} size="sm" />
              <div className="flex-1">
                <p className="text-sm font-medium">{l.employeeName}</p>
                <p className="text-xs text-muted-foreground">{l.type} leave · {l.days}d · {formatDate(l.from, 'short')} – {formatDate(l.to, 'short')}</p>
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8 text-success-600"><Icon name="Check" className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" className="h-8 w-8 text-danger-600"><Icon name="X" className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
