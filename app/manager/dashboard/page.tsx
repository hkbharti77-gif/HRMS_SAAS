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
import { AreaTrend } from '@/components/shared/charts';
import { employees, leaveRequests, goals, attendance } from '@/lib/mock-data';
import { formatDate, relativeTime } from '@/lib/format';

const teamPerformanceTrend = [
  { month: 'Feb', value: 72 },
  { month: 'Mar', value: 75 },
  { month: 'Apr', value: 73 },
  { month: 'May', value: 78 },
  { month: 'Jun', value: 80 },
  { month: 'Jul', value: 82 },
];

export default function ManagerDashboardPage() {
  const teamMembers = employees.filter((e) => e.manager === 'Sarah Chen').slice(0, 12);
  const pendingApprovals = leaveRequests.filter((l) => l.status === 'Pending').slice(0, 4);
  const onLeaveToday = teamMembers.filter((e) => e.status === 'on-leave');
  const teamGoals = goals.filter((g) => g.ownerType === 'Team' || g.ownerType === 'Individual').slice(0, 5);

  return (
    <div>
      <PageHeader
        title="My Dashboard"
        description="Your team snapshot and pending approvals."
        breadcrumbs={[{ label: 'Manager', href: '/manager/dashboard' }]}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Direct reports" value={teamMembers.length} icon="Users" tone="brand" />
        <StatCard label="Pending approvals" value={pendingApprovals.length} icon="CheckSquare" tone="warning" footer="awaiting action" />
        <StatCard label="On leave today" value={onLeaveToday.length} icon="CalendarOff" tone="info" />
        <StatCard label="Team goals on track" value={teamGoals.filter((g) => g.status === 'On Track').length} icon="Target" tone="success" footer={`of ${teamGoals.length}`} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <CopilotInsights />
        </div>
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4"><CardTitle className="text-base">Team Performance Score</CardTitle></CardHeader>
          <CardContent>
            <AreaTrend data={teamPerformanceTrend} xKey="month" yKey="value" color="#2563eb" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base">Pending Approvals</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs" asChild>
              <a href="/manager/approvals">View all</a>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingApprovals.map((l) => (
              <div key={l.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AvatarBadge name={l.employeeName} size="sm" />
                    <div>
                      <p className="text-sm font-medium">{l.employeeName}</p>
                      <p className="text-xs text-muted-foreground">{l.type} · {l.days} day{l.days > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" className="h-7 w-7 text-success-600"><Icon name="Check" className="h-3.5 w-3.5" /></Button>
                    <Button variant="outline" size="icon" className="h-7 w-7 text-danger-600"><Icon name="X" className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{formatDate(l.from, 'short')} – {formatDate(l.to, 'short')}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">My Team</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {teamMembers.slice(0, 6).map((m) => (
              <div key={m.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <AvatarBadge name={`${m.firstName} ${m.lastName}`} size="sm" />
                  <div>
                    <p className="text-sm font-medium">{m.firstName} {m.lastName}</p>
                    <p className="text-xs text-muted-foreground">{m.designation}</p>
                  </div>
                </div>
                <StatusBadge status={m.status} dot />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Team Goals</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {teamGoals.map((g) => (
              <div key={g.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{g.title}</p>
                  <StatusBadge status={g.status} dot />
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{g.owner}</span>
                    <span className="font-medium">{g.progress}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${g.progress >= 70 ? 'bg-success-500' : g.progress >= 40 ? 'bg-brand-500' : 'bg-warning-500'}`} style={{ width: `${g.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
