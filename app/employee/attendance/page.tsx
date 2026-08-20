'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { myAttendance } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

export default function EmployeeAttendancePage() {
  const present = myAttendance.filter((a) => a.status === 'Present').length;
  const late = myAttendance.filter((a) => a.status === 'Late').length;
  const wfh = myAttendance.filter((a) => a.status === 'WFH').length;
  const leave = myAttendance.filter((a) => a.status === 'Leave').length;
  const totalHours = myAttendance.reduce((s, a) => s + a.hours, 0);
  const avgHours = (totalHours / myAttendance.filter((a) => a.hours > 0).length).toFixed(1);

  return (
    <div>
      <PageHeader
        title="My Attendance"
        description="Track your punch in/out times and attendance history."
        breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Attendance' }]}
        action={{ label: 'Request regularization', icon: 'RefreshCw' }}
      />

      <Card className="mb-6">
        <CardContent className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10">
              <Icon name="Clock3" className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Today's Status</p>
              <p className="text-lg font-semibold">Not punched in yet</p>
            </div>
          </div>
          <Button size="lg" className="gap-2"><Icon name="ArrowRight" className="h-4 w-4" />Punch In</Button>
        </CardContent>
      </Card>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Present" value={present} icon="CircleCheck" tone="success" />
        <StatCard label="Late" value={late} icon="ClockAlert" tone="warning" />
        <StatCard label="WFH" value={wfh} icon="Building" tone="info" />
        <StatCard label="Leave" value={leave} icon="CalendarOff" tone="danger" />
        <StatCard label="Avg hours" value={`${avgHours}h`} icon="Timer" tone="brand" />
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Attendance History</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Punch In</th>
                  <th className="px-4 py-3 font-medium">Punch Out</th>
                  <th className="px-4 py-3 font-medium">Hours</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {myAttendance.map((a) => (
                  <tr key={a.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{formatDate(a.date, 'short')}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.punchIn}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.punchOut}</td>
                    <td className="px-4 py-3">{a.hours > 0 ? `${a.hours}h` : '—'}</td>
                    <td className="px-4 py-3"><StatusBadge status={a.status} dot /></td>
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
