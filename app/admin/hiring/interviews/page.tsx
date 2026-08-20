'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { interviews } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

type Interview = (typeof interviews)[number];

export default function InterviewsPage() {
  const scheduled = interviews.filter((i) => i.status === 'Scheduled').length;
  const completed = interviews.filter((i) => i.status === 'Completed').length;

  const columns: Column<Interview>[] = [
    {
      key: 'candidate',
      header: 'Candidate',
      sortable: true,
      sortValue: (r) => r.candidate,
      cell: (r) => (
        <div className="flex items-center gap-2">
          <AvatarBadge name={r.candidate} size="sm" />
          <span className="font-medium">{r.candidate}</span>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      cell: (r) => <span className="text-muted-foreground">{r.role}</span>,
      hideOnMobile: true,
    },
    {
      key: 'round',
      header: 'Round',
      sortable: true,
      sortValue: (r) => r.round,
      cell: (r) => <span className="text-sm">{r.round}</span>,
    },
    {
      key: 'interviewer',
      header: 'Interviewer',
      cell: (r) => <span className="text-muted-foreground">{r.interviewer}</span>,
      hideOnMobile: true,
    },
    {
      key: 'date',
      header: 'Date & Time',
      sortable: true,
      sortValue: (r) => r.date,
      cell: (r) => (
        <div>
          <p className="text-sm font-medium">{formatDate(r.date, 'short')}</p>
          <p className="text-xs text-muted-foreground">{r.time} · {r.duration}min</p>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Mode',
      cell: (r) => (
        <span className="flex items-center gap-1 text-xs">
          <Icon name={r.type === 'Video' ? 'Video' : 'MapPin'} className="h-3.5 w-3.5" />
          {r.type}
        </span>
      ),
      hideOnMobile: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      sortValue: (r) => r.status,
      cell: (r) => <StatusBadge status={r.status} dot />,
    },
    {
      key: 'actions',
      header: '',
      cell: (r) =>
        r.status === 'Scheduled' ? (
          <Button variant="outline" size="sm"><Icon name="Video" className="mr-1.5 h-3.5 w-3.5" />Join</Button>
        ) : (
          <Button variant="ghost" size="sm"><Icon name="FileText" className="mr-1.5 h-3.5 w-3.5" />Notes</Button>
        ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Interviews"
        description="Schedule, track, and review candidate interviews."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Hiring' }, { label: 'Interviews' }]}
        action={{ label: 'Schedule', icon: 'Plus' }}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Scheduled" value={scheduled} icon="CalendarClock" tone="brand" />
        <StatCard label="Completed" value={completed} icon="CircleCheck" tone="success" />
        <StatCard label="Total" value={interviews.length} icon="Users" tone="info" />
      </div>
      <DataTable
        columns={columns}
        data={interviews}
        searchKeys={['candidate', 'role', 'round', 'interviewer', 'status']}
        searchPlaceholder="Search interviews..."
        initialSort={{ key: 'date', dir: 'asc' }}
      />
    </div>
  );
}
