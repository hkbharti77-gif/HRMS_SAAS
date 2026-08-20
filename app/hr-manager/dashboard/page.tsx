'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { CopilotInsights } from '@/components/shared/copilot-insights';
import { Icon } from '@/components/shared/icon';
import { AreaTrend, DonutChart, MultiBarTrend } from '@/components/shared/charts';
import { employees, leaveRequests, tickets, announcements, probationEmployees, offboardingEmployees, complianceFilings } from '@/lib/mock-data';
import { formatDate, relativeTime } from '@/lib/format';

const headcountTrend = [
  { month: 'Feb', value: 305 }, { month: 'Mar', value: 312 }, { month: 'Apr', value: 318 },
  { month: 'May', value: 325 }, { month: 'Jun', value: 331 }, { month: 'Jul', value: 342 },
];
const deptDist = [
  { name: 'Engineering', value: 42, fill: '#2563eb' },
  { name: 'Sales', value: 22, fill: '#0d9488' },
  { name: 'CS', value: 17, fill: '#f59e0b' },
  { name: 'Marketing', value: 15, fill: '#ea580c' },
  { name: 'Other', value: 44, fill: '#64748b' },
];
const attendanceTrend = [
  { day: 'Mon', present: 312, absent: 18, wfh: 12 },
  { day: 'Tue', present: 318, absent: 14, wfh: 10 },
  { day: 'Wed', present: 305, absent: 22, wfh: 15 },
  { day: 'Thu', present: 320, absent: 12, wfh: 10 },
  { day: 'Fri', present: 298, absent: 20, wfh: 24 },
];

export default function HrManagerDashboardPage() {
  const pendingLeave = leaveRequests.filter((l) => l.status === 'Pending');
  const openTickets = tickets.filter((t) => t.status === 'Open' || t.status === 'In Progress');
  const activeProbation = probationEmployees.filter((p) => p.status === 'In Progress');
  const activeOffboarding = offboardingEmployees.filter((o) => o.status !== 'Completed');
  const pendingCompliance = complianceFilings.filter((c) => c.status === 'Action Required');

  return (
    <div>
      <PageHeader title="HR Dashboard" description="People operations overview across your organization." breadcrumbs={[{ label: 'HR Manager', href: '/hr-manager/dashboard' }]} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total employees" value={342} icon="Users" tone="brand" footer="+12 this quarter" />
        <StatCard label="Pending leave approvals" value={pendingLeave.length} icon="CheckSquare" tone="warning" />
        <StatCard label="Open tickets" value={openTickets.length} icon="LifeBuoy" tone="info" />
        <StatCard label="Compliance alerts" value={pendingCompliance.length} icon="AlertTriangle" tone="danger" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <CopilotInsights />
        </div>
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4"><CardTitle className="text-base">Headcount Growth</CardTitle></CardHeader>
          <CardContent><AreaTrend data={headcountTrend} xKey="month" yKey="value" color="#2563eb" /></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4"><CardTitle className="text-base">Department Mix</CardTitle></CardHeader>
          <CardContent><DonutChart data={deptDist} height={200} /></CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Pending Leave Approvals</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs" asChild><a href="/hr-manager/leave-approvals">Review all</a></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingLeave.slice(0, 4).map((l) => (
              <div key={l.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <AvatarBadge name={l.employeeName} size="sm" />
                  <div><p className="text-sm font-medium">{l.employeeName}</p><p className="text-xs text-muted-foreground">{l.type} · {l.days}d · {formatDate(l.from, 'short')}</p></div>
                </div>
                <StatusBadge status={l.status} dot />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">People Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ActionRow icon="Hourglass" label="Probation reviews" count={activeProbation.length} href="/hr-manager/people" tone="text-warning-600 bg-warning-50 dark:bg-warning-500/10" />
            <ActionRow icon="LogOut" label="Offboarding in progress" count={activeOffboarding.length} href="/hr-manager/people" tone="text-danger-600 bg-danger-50 dark:bg-danger-500/10" />
            <ActionRow icon="Landmark" label="Compliance filings due" count={pendingCompliance.length} href="/hr-manager/payroll" tone="text-brand-600 bg-brand-50 dark:bg-brand-500/10" />
            <ActionRow icon="LifeBuoy" label="Open helpdesk tickets" count={openTickets.length} href="/hr-manager/helpdesk" tone="text-info-600 bg-info-50 dark:bg-info-500/10" />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader className="pb-4"><CardTitle className="text-base">Weekly Attendance</CardTitle></CardHeader>
          <CardContent>
            <MultiBarTrend data={attendanceTrend} xKey="day" series={[{ key: 'present', name: 'Present', color: '#22c55e' }, { key: 'wfh', name: 'WFH', color: '#3b82f6' }, { key: 'absent', name: 'Absent', color: '#ef4444' }]} stacked />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Latest Announcements</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {announcements.slice(0, 3).map((a) => (
              <div key={a.id} className="flex items-start gap-3 rounded-lg border p-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10"><Icon name="Megaphone" className="h-4 w-4" /></div>
                <div><p className="text-sm font-medium">{a.title}</p><p className="mt-0.5 text-xs text-muted-foreground">{relativeTime(a.date)}</p></div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add Employee', icon: 'UserPlus', href: '/hr-manager/people', tone: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10' },
              { label: 'Run Payroll', icon: 'Banknote', href: '/hr-manager/payroll', tone: 'bg-success-50 text-success-600 dark:bg-success-500/10' },
              { label: 'Post Announcement', icon: 'Megaphone', href: '/hr-manager/engagement', tone: 'bg-warning-50 text-warning-600 dark:bg-warning-500/10' },
              { label: 'View Reports', icon: 'BarChart3', href: '/hr-manager/reports', tone: 'bg-info-50 text-info-600 dark:bg-info-500/10' },
            ].map((a) => (
              <a key={a.label} href={a.href} className="group flex items-center gap-3 rounded-xl border bg-card p-4 transition-all hover:shadow-soft hover:border-brand-200 dark:hover:border-brand-800">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${a.tone}`}><Icon name={a.icon} className="h-5 w-5" /></div>
                <span className="text-sm font-medium">{a.label}</span>
              </a>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ActionRow({ icon, label, count, href, tone }: { icon: string; label: string; count: number; href: string; tone: string }) {
  return (
    <a href={href} className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/30">
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone}`}><Icon name={icon} className="h-4 w-4" /></div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className="text-lg font-bold">{count}</span>
    </a>
  );
}
