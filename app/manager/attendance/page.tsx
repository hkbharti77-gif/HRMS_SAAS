'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { MultiBarTrend } from '@/components/shared/charts';
import { attendance } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

const weeklyAttendance = [
  { day: 'Mon', present: 10, absent: 1, wfh: 1 },
  { day: 'Tue', present: 11, absent: 0, wfh: 1 },
  { day: 'Wed', present: 9, absent: 1, wfh: 2 },
  { day: 'Thu', present: 10, absent: 0, wfh: 2 },
  { day: 'Fri', present: 8, absent: 1, wfh: 3 },
];

export default function ManagerAttendancePage() {
  const teamAttendance = attendance.slice(0, 10);
  const presentToday = teamAttendance.filter((a) => a.status === 'Present' || a.status === 'WFH').length;
  const lateToday = teamAttendance.filter((a) => a.status === 'Late').length;
  const absentToday = teamAttendance.filter((a) => a.status === 'Absent').length;

  return (
    <div>
      <PageHeader
        title="Team Attendance"
        description="Monitor your team's attendance patterns and punctuality."
        breadcrumbs={[{ label: 'Manager', href: '/manager/dashboard' }, { label: 'Attendance' }]}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Present today" value={presentToday} icon="CircleCheck" tone="success" />
        <StatCard label="Late today" value={lateToday} icon="Clock3" tone="warning" />
        <StatCard label="Absent" value={absentToday} icon="CircleX" tone="danger" />
        <StatCard label="WFH" value={teamAttendance.filter((a) => a.status === 'WFH').length} icon="Building" tone="info" />
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-4"><CardTitle className="text-base">Weekly Attendance Breakdown</CardTitle></CardHeader>
        <CardContent>
          <MultiBarTrend
            data={weeklyAttendance}
            xKey="day"
            series={[
              { key: 'present', name: 'Present', color: '#22c55e' },
              { key: 'wfh', name: 'WFH', color: '#3b82f6' },
              { key: 'absent', name: 'Absent', color: '#ef4444' },
            ]}
            stacked
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Recent Attendance Log</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {teamAttendance.map((a) => (
            <div key={a.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <AvatarBadge name={a.employeeName} size="sm" />
                <div>
                  <p className="text-sm font-medium">{a.employeeName}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(a.date, 'short')} · In: {a.punchIn} · Out: {a.punchOut}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{a.hours}h</span>
                <StatusBadge status={a.status} dot />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
