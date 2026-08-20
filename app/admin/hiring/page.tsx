'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarTrend, DonutChart } from '@/components/shared/charts';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { jobPostings, candidates, requisitions } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

const hiringFunnel = [
  { stage: 'Applied', value: 48 },
  { stage: 'Screening', value: 24 },
  { stage: 'Interview', value: 12 },
  { stage: 'Offer', value: 4 },
  { stage: 'Hired', value: 2 },
];

const openByDept = [
  { name: 'Engineering', value: 3, fill: '#2563eb' },
  { name: 'Sales', value: 2, fill: '#0d9488' },
  { name: 'Product', value: 1, fill: '#f59e0b' },
  { name: 'Design', value: 1, fill: '#ec4899' },
];

export default function HiringDashboardPage() {
  const openReq = requisitions.filter((r) => r.status === 'Open').length;
  const totalApplicants = jobPostings.reduce((s, j) => s + j.applicants, 0);
  const activeCandidates = candidates.filter((c) => c.stage !== 'Hired' && c.stage !== 'Rejected').length;

  return (
    <div>
      <PageHeader
        title="Hiring Dashboard"
        description="Track open positions, pipeline health, and time-to-hire metrics."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Hiring' }]}
        action={{ label: 'New requisition', icon: 'Plus', href: '/admin/hiring/requisitions' }}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open positions" value={openReq} icon="Briefcase" tone="brand" footer="active reqs" />
        <StatCard label="Total applicants" value={totalApplicants} icon="Users" tone="info" footer="all postings" />
        <StatCard label="In pipeline" value={activeCandidates} icon="KanbanSquare" tone="warning" footer="active candidates" />
        <StatCard label="Hired this month" value={candidates.filter((c) => c.stage === 'Hired').length} icon="CircleCheck" tone="success" footer="offers accepted" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4"><CardTitle className="text-base">Hiring Funnel</CardTitle></CardHeader>
          <CardContent>
            <BarTrend data={hiringFunnel} xKey="stage" yKey="value" color="#2563eb" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4"><CardTitle className="text-base">Open Roles by Dept</CardTitle></CardHeader>
          <CardContent>
            <DonutChart data={openByDept} height={200} innerRadius={55} />
            <div className="mt-4 space-y-2">
              {openByDept.map((d) => (
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

      <Card className="mt-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base">Active Candidates</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs" >View pipeline</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {candidates.filter((c) => c.stage !== 'Hired' && c.stage !== 'Rejected').slice(0, 5).map((c) => (
            <div key={c.id} className="flex items-center gap-3 rounded-lg border p-3">
              <AvatarBadge name={c.name} size="sm" />
              <div className="flex-1">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.role} · {c.source} · {formatDate(c.appliedOn, 'short')}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs">
                  <Icon name="Star" className="h-3.5 w-3.5 text-warning-500" />
                  <span className="font-medium">{c.rating}</span>
                </div>
                <StatusBadge status={c.stage} dot />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
