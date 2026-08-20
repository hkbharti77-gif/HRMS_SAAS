'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable, type Column } from '@/components/shared/data-table';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { jobPostings } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import type { JobPosting } from '@/lib/types';

export default function JobPostingsPage() {
  const columns: Column<JobPosting>[] = [
    {
      key: 'title',
      header: 'Job Title',
      sortable: true,
      sortValue: (r) => r.title,
      cell: (r) => <span className="font-medium">{r.title}</span>,
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
      sortValue: (r) => r.department,
      cell: (r) => <span className="text-muted-foreground">{r.department}</span>,
      hideOnMobile: true,
    },
    {
      key: 'location',
      header: 'Location',
      cell: (r) => <span className="text-muted-foreground">{r.location}</span>,
      hideOnMobile: true,
    },
    {
      key: 'type',
      header: 'Type',
      cell: (r) => <span className="text-sm">{r.type}</span>,
      hideOnMobile: true,
    },
    {
      key: 'applicants',
      header: 'Applicants',
      sortable: true,
      sortValue: (r) => r.applicants,
      cell: (r) => <span className="font-medium">{r.applicants}</span>,
    },
    {
      key: 'postedOn',
      header: 'Posted',
      sortable: true,
      sortValue: (r) => r.postedOn,
      cell: (r) => <span className="text-muted-foreground">{formatDate(r.postedOn, 'short')}</span>,
      hideOnMobile: true,
    },
    {
      key: 'stage',
      header: 'Status',
      sortable: true,
      sortValue: (r) => r.stage,
      cell: (r) => <StatusBadge status={r.stage} dot />,
    },
    {
      key: 'actions',
      header: '',
      cell: () => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Eye" className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Edit3" className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Job Postings"
        description="Manage public job listings, track applicants, and control posting status."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Hiring' }, { label: 'Postings' }]}
        action={{ label: 'Post job', icon: 'Plus' }}
      />
      <DataTable
        columns={columns}
        data={jobPostings}
        searchKeys={['title', 'department', 'location', 'type', 'stage']}
        searchPlaceholder="Search job postings..."
        initialSort={{ key: 'postedOn', dir: 'desc' }}
      />
    </div>
  );
}
