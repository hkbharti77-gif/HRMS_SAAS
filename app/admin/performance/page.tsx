'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/shared/icon';
import { StatusBadge } from '@/components/shared/status-badge';
import { FormDrawer } from '@/components/shared/form-drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { goals } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import type { Goal } from '@/lib/types';

const statusTone: Record<string, 'success' | 'brand' | 'warning' | 'danger'> = {
  'On Track': 'success',
  'At Risk': 'warning',
  'Behind': 'danger',
  'Completed': 'brand',
};

export default function GoalsPage() {
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<'all' | 'Company' | 'Team' | 'Individual'>('all');

  const data = filter === 'all' ? goals : goals.filter((g) => g.ownerType === filter);

  return (
    <div>
      <PageHeader
        title="Goals / OKR"
        description="Track organizational, team, and individual goals with key results."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Performance' }]}
        action={{ label: 'New goal', icon: 'Plus', onClick: () => setOpen(true) }}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total goals" value={goals.length} icon="Target" tone="brand" />
        <StatCard label="On track" value={goals.filter((g) => g.status === 'On Track').length} icon="CircleCheck" tone="success" />
        <StatCard label="At risk" value={goals.filter((g) => g.status === 'At Risk').length} icon="AlertTriangle" tone="warning" />
        <StatCard label="Completed" value={goals.filter((g) => g.status === 'Completed').length} icon="CheckCircle2" tone="info" />
      </div>

      <div className="mb-4 flex items-center gap-1 rounded-lg border p-1 w-fit">
        {(['all', 'Company', 'Team', 'Individual'] as const).map((f) => (
          <Button key={f} variant={filter === f ? 'secondary' : 'ghost'} size="sm" className="h-7 px-3 text-xs" onClick={() => setFilter(f)}>
            {f}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {data.map((g) => (
          <Card key={g.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{g.title}</h3>
                    <Badge variant="secondary">{g.ownerType}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Owner: {g.owner} · Due {formatDate(g.dueDate, 'short')}</p>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{g.progress}%</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                      <div className={`h-full rounded-full ${g.status === 'Behind' ? 'bg-danger-500' : g.status === 'At Risk' ? 'bg-warning-500' : g.status === 'Completed' ? 'bg-brand-500' : 'bg-success-500'}`} style={{ width: `${g.progress}%` }} />
                    </div>
                  </div>
                  {g.keyResults.length > 0 && (
                    <div className="mt-4 space-y-1.5">
                      {g.keyResults.map((kr) => (
                        <div key={kr.id} className="flex items-center gap-2 text-sm">
                          <Icon name={kr.done ? 'CircleCheck' : 'CircleDot'} className={`h-4 w-4 ${kr.done ? 'text-success-600' : 'text-muted-foreground'}`} />
                          <span className={kr.done ? 'text-muted-foreground line-through' : ''}>{kr.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <StatusBadge status={g.status} tone={statusTone[g.status] ?? 'neutral'} dot />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <FormDrawer
        open={open}
        onOpenChange={setOpen}
        title="New Goal"
        description="Create a new OKR or goal."
        onSubmit={() => setOpen(false)}
        submitLabel="Create"
      >
        <div className="space-y-2"><Label>Goal title</Label><Input placeholder="e.g. Reduce customer churn by 15%" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Owner</Label><Input placeholder="Person or team" /></div>
          <div className="space-y-2"><Label>Owner type</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>Company</option><option>Team</option><option>Individual</option></select></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Due date</Label><Input type="date" /></div>
          <div className="space-y-2"><Label>Target progress</Label><Input type="number" defaultValue={100} /></div>
        </div>
      </FormDrawer>
    </div>
  );
}
