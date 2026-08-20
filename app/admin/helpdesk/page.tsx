'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaTrend } from '@/components/shared/charts';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { tickets, ticketTrend, helpdeskCategories } from '@/lib/mock-data';
import { relativeTime } from '@/lib/format';

export default function HelpdeskDashboardPage() {
  const open = tickets.filter((t) => t.status === 'Open').length;
  const inProgress = tickets.filter((t) => t.status === 'In Progress').length;
  const resolved = tickets.filter((t) => t.status === 'Resolved' || t.status === 'Closed').length;

  return (
    <div>
      <PageHeader
        title="Helpdesk Dashboard"
        description="Track ticket volumes, SLA compliance, and resolution times."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Helpdesk' }]}
        action={{ label: 'New ticket', icon: 'Plus', href: '/admin/helpdesk/tickets' }}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open tickets" value={open} icon="Ticket" tone="danger" />
        <StatCard label="In progress" value={inProgress} icon="Clock3" tone="warning" />
        <StatCard label="Resolved" value={resolved} icon="CircleCheck" tone="success" />
        <StatCard label="Avg resolution" value="4.2h" icon="Gauge" tone="brand" footer="this month" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4"><CardTitle className="text-base">Tickets: Opened vs Resolved</CardTitle></CardHeader>
          <CardContent>
            <AreaTrend data={ticketTrend} xKey="week" yKey="opened" color="#2563eb" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4"><CardTitle className="text-base">Categories & SLA</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {helpdeskCategories.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.tickets} tickets · SLA {c.sla}</p>
                </div>
                <span className="text-xs font-medium text-success-600">{Math.round((c.resolved / c.tickets) * 100)}%</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base">Recent Tickets</CardTitle>
          <a href="/admin/helpdesk/tickets" className="text-xs text-muted-foreground hover:text-foreground">View all</a>
        </CardHeader>
        <CardContent className="space-y-3">
          {tickets.slice(0, 5).map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <AvatarBadge name={t.raisedBy} size="sm" />
                <div>
                  <p className="text-sm font-medium">{t.subject}</p>
                  <p className="text-xs text-muted-foreground">{t.category} · by {t.raisedBy} · {relativeTime(t.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={t.priority} dot />
                <StatusBadge status={t.status} dot />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
