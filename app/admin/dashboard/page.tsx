'use client';

import * as React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaTrend, DonutChart, BarTrend } from '@/components/shared/charts';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Icon } from '@/components/shared/icon';
import { Button } from '@/components/ui/button';
import { CopilotInsights } from '@/components/shared/copilot-insights';
import { employees, leaveRequests, attendance, jobPostings, headcountTrend, attendanceTrend } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

const deptDist = [
  { name: 'Engineering', value: 124, fill: '#2563eb' },
  { name: 'Sales', value: 68, fill: '#0d9488' },
  { name: 'HR', value: 22, fill: '#f59e0b' },
  { name: 'Finance', value: 35, fill: '#8b5cf6' },
  { name: 'Operations', value: 93, fill: '#ec4899' },
];

export default function AdminDashboardPage() {
  const presentToday = attendance.filter((a) => a.status === 'Present' || a.status === 'WFH').length;
  const pendingApprovals = leaveRequests.filter((l) => l.status === 'Pending').length;
  const openPositions = jobPostings.filter((j) => j.stage === 'Open').length;
  const totalCandidates = jobPostings.reduce((s, j) => s + j.applicants, 0);
  const recentHires = employees.slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Your company at a glance — headcount, attendance, and pending actions."
        action={{ label: 'Export report', icon: 'Download', variant: 'outline' }}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total employees" value={employees.length} icon="Users" trend={{ value: '3.2%', up: true }} tone="brand" footer="vs last month" />
        <StatCard label="Present today" value={presentToday} icon="CalendarCheck" trend={{ value: '5%', up: true }} tone="success" footer={`${Math.round((presentToday / employees.length) * 100)}% attendance`} />
        <StatCard label="Pending approvals" value={pendingApprovals} icon="CheckSquare" tone="warning" footer="leave & expenses" />
        <StatCard label="Open positions" value={openPositions} icon="Briefcase" tone="info" footer={`${totalCandidates} candidates`} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <CopilotInsights />
        </div>
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base">Headcount Trend</CardTitle>
            <Link href="/admin/reports">
              <Button variant="ghost" size="sm" className="text-xs">View reports</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <AreaTrend data={headcountTrend} xKey="month" yKey="value" color="#2563eb" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Department Distribution</CardTitle>
          </CardHeader>
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

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Attendance This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <BarTrend data={attendanceTrend} xKey="day" yKey="present" color="#0d9488" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base">Pending Approvals</CardTitle>
            <Link href="/admin/leave/approvals">
              <Button variant="ghost" size="sm" className="text-xs">View all</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {leaveRequests.filter((l) => l.status === 'Pending').slice(0, 4).map((l) => (
              <div key={l.id} className="flex items-center gap-3 rounded-lg border p-3">
                <AvatarBadge name={l.employeeName} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{l.employeeName}</p>
                  <p className="truncate text-xs text-muted-foreground">{l.type} leave · {l.days}d</p>
                </div>
                <StatusBadge status={l.status} />
              </div>
            ))}
            {pendingApprovals === 0 && (
              <p className="py-4 text-center text-sm text-muted-foreground">No pending approvals.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base">Recent Hires</CardTitle>
            <Link href="/admin/people">
              <Button variant="ghost" size="sm" className="text-xs">View directory</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentHires.map((e) => (
              <Link key={e.id} href={`/admin/people/${e.id}`} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-accent">
                <AvatarBadge name={`${e.firstName} ${e.lastName}`} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{e.firstName} {e.lastName}</p>
                  <p className="truncate text-xs text-muted-foreground">{e.designation} · {e.department}</p>
                </div>
                <span className="text-xs text-muted-foreground">{formatDate(e.joinDate, 'short')}</span>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base">Open Positions</CardTitle>
            <Link href="/admin/hiring">
              <Button variant="ghost" size="sm" className="text-xs">View hiring</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {jobPostings.filter((j) => j.stage === 'Open').slice(0, 4).map((j) => (
              <Link key={j.id} href="/admin/hiring/postings" className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-accent">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                  <Icon name="Briefcase" className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{j.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{j.department} · {j.location}</p>
                </div>
                <span className="text-xs font-medium text-muted-foreground">{j.applicants} applicants</span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
