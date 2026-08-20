'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { CopilotInsights } from '@/components/shared/copilot-insights';
import { announcements, myLeaveRequests, myGoals, myAttendance } from '@/lib/mock-data';
import { formatDate, relativeTime } from '@/lib/format';

const quickActions = [
  { label: 'Apply Leave', icon: 'CalendarOff', href: '/employee/leave/apply', tone: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400' },
  { label: 'File Expense', icon: 'Wallet', href: '/employee/expenses', tone: 'bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-400' },
  { label: 'Raise Ticket', icon: 'LifeBuoy', href: '/employee/helpdesk', tone: 'bg-warning-50 text-warning-600 dark:bg-warning-500/10 dark:text-warning-400' },
  { label: 'Punch In/Out', icon: 'Clock3', href: '/employee/attendance', tone: 'bg-info-50 text-info-600 dark:bg-info-500/10 dark:text-info-400' },
];

export default function EmployeeDashboardPage() {
  const pendingLeave = myLeaveRequests.filter((l) => l.status === 'Pending');
  const recentAttendance = myAttendance.slice(0, 5);
  const recentAnnouncements = announcements.slice(0, 3);

  return (
    <div>
      <PageHeader title="My Dashboard" description="Your work day at a glance." breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }]} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Leave balance" value="22 days" icon="CalendarOff" tone="brand" footer="C:6 S:4 E:12" />
        <StatCard label="This month" value="20 days" icon="CalendarCheck" tone="success" footer="present" />
        <StatCard label="Pending tasks" value={pendingLeave.length} icon="CheckSquare" tone="warning" footer="awaiting approval" />
        <StatCard label="Goal progress" value="78%" icon="Target" tone="info" footer="on track" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((a) => (
          <a key={a.label} href={a.href} className="group flex items-center gap-3 rounded-xl border bg-card p-4 transition-all hover:shadow-soft hover:border-brand-200 dark:hover:border-brand-800">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${a.tone}`}><Icon name={a.icon} className="h-5 w-5" /></div>
            <span className="text-sm font-medium">{a.label}</span>
            <Icon name="ChevronRight" className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </a>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <CopilotInsights />
        </div>
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">My Goals</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {myGoals.map((g) => (
              <div key={g.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{g.title}</p>
                  <StatusBadge status={g.status} dot />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${g.progress >= 70 ? 'bg-success-500' : g.progress >= 40 ? 'bg-brand-500' : 'bg-warning-500'}`} style={{ width: `${g.progress}%` }} />
                  </div>
                  <span className="text-xs font-medium">{g.progress}%</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Due {formatDate(g.dueDate, 'short')} · {g.keyResults.filter((k) => k.done).length}/{g.keyResults.length} key results done</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Recent Attendance</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {recentAttendance.map((a) => (
              <div key={a.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">{formatDate(a.date, 'short')}</p>
                  <p className="text-xs text-muted-foreground">{a.punchIn} – {a.punchOut}</p>
                </div>
                <StatusBadge status={a.status} dot />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Pending Leave Requests</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs" asChild><a href="/employee/leave/apply">Apply new</a></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingLeave.length > 0 ? pendingLeave.map((l) => (
              <div key={l.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{l.type} · {l.days} day{l.days > 1 ? 's' : ''}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(l.from, 'short')} – {formatDate(l.to, 'short')}</p>
                </div>
                <StatusBadge status={l.status} dot />
              </div>
            )) : <p className="py-4 text-center text-sm text-muted-foreground">No pending requests</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Announcements</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {recentAnnouncements.map((a) => (
              <div key={a.id} className="flex items-start gap-3 rounded-lg border p-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10"><Icon name="Megaphone" className="h-4 w-4" /></div>
                <div>
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{relativeTime(a.date)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
