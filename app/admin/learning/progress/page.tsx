'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { learningProgress } from '@/lib/mock-data';

type LP = (typeof learningProgress)[number];

export default function LearningProgressPage() {
  const completed = learningProgress.filter((l) => l.status === 'Completed').length;
  const inProgress = learningProgress.filter((l) => l.status === 'In Progress').length;
  const avgScore = Math.round(learningProgress.filter((l) => l.score !== null).reduce((s, l) => s + (l.score ?? 0), 0) / learningProgress.filter((l) => l.score !== null).length);

  const columns: Column<LP>[] = [
    {
      key: 'employeeName',
      header: 'Employee',
      sortable: true,
      sortValue: (r) => r.employeeName,
      cell: (r) => (
        <div className="flex items-center gap-2">
          <AvatarBadge name={r.employeeName} size="sm" />
          <span className="font-medium">{r.employeeName}</span>
        </div>
      ),
    },
    {
      key: 'course',
      header: 'Course',
      sortable: true,
      sortValue: (r) => r.course,
      cell: (r) => <span className="text-sm">{r.course}</span>,
    },
    {
      key: 'progress',
      header: 'Progress',
      sortable: true,
      sortValue: (r) => r.progress,
      cell: (r) => (
        <div className="flex items-center gap-2">
          <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-brand-500" style={{ width: `${r.progress}%` }} />
          </div>
          <span className="text-xs font-medium">{r.progress}%</span>
        </div>
      ),
    },
    {
      key: 'score',
      header: 'Score',
      sortable: true,
      sortValue: (r) => r.score ?? -1,
      cell: (r) => r.score !== null ? <span className="font-medium">{r.score}%</span> : <span className="text-muted-foreground">—</span>,
      hideOnMobile: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      sortValue: (r) => r.status,
      cell: (r) => <StatusBadge status={r.status} dot />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Progress"
        description="Track individual learning progress and completion scores."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Learning' }, { label: 'Progress' }]}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Completed" value={completed} icon="CircleCheck" tone="success" />
        <StatCard label="In progress" value={inProgress} icon="Clock3" tone="warning" />
        <StatCard label="Avg score" value={`${avgScore}%`} icon="Star" tone="brand" />
      </div>
      <DataTable
        columns={columns}
        data={learningProgress}
        searchKeys={['employeeName', 'course', 'status']}
        searchPlaceholder="Search progress..."
      />
    </div>
  );
}
