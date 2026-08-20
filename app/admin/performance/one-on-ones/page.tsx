'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent } from '@/components/ui/card';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { oneOnOnes } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

export default function OneOnOnesPage() {
  const upcoming = oneOnOnes.filter((o) => o.status === 'Scheduled').length;
  const completed = oneOnOnes.filter((o) => o.status === 'Completed').length;

  return (
    <div>
      <PageHeader
        title="1:1 Meetings"
        description="Schedule and track recurring one-on-one meetings between managers and reports."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Performance' }, { label: '1:1s' }]}
        action={{ label: 'Schedule 1:1', icon: 'Plus' }}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Upcoming" value={upcoming} icon="CalendarClock" tone="brand" />
        <StatCard label="Completed" value={completed} icon="CircleCheck" tone="success" />
        <StatCard label="Total" value={oneOnOnes.length} icon="MessagesSquare" tone="info" />
      </div>

      <div className="space-y-4">
        {oneOnOnes.map((o) => (
          <Card key={o.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <AvatarBadge name={o.manager} size="sm" className="ring-2 ring-card" />
                  <AvatarBadge name={o.employee} size="sm" className="ring-2 ring-card" />
                </div>
                <div>
                  <p className="text-sm font-medium">{o.manager} <span className="text-muted-foreground">&harr;</span> {o.employee}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(o.date, 'long')} · {o.time} · {o.duration}min</p>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-4 sm:flex-none">
                <div className="flex-1 sm:max-w-md">
                  <p className="text-xs text-muted-foreground">Agenda</p>
                  <p className="text-sm">{o.agenda}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={o.status} dot />
                {o.status === 'Scheduled' && <Button variant="outline" size="sm"><Icon name="Video" className="mr-1.5 h-3.5 w-3.5" />Join</Button>}
                {o.status === 'Completed' && <Button variant="ghost" size="sm"><Icon name="FileText" className="mr-1.5 h-3.5 w-3.5" />Notes</Button>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
