'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { myCourses } from '@/lib/mock-data';

export default function EmployeeLearningPage() {
  const completed = myCourses.filter((c) => c.status === 'Completed').length;
  const inProgress = myCourses.filter((c) => c.status === 'In Progress').length;
  const avgScore = Math.round(myCourses.filter((c) => c.score !== null).reduce((s, c) => s + (c.score ?? 0), 0) / myCourses.filter((c) => c.score !== null).length);

  return (
    <div>
      <PageHeader
        title="My Learning"
        description="Courses assigned to you and your training progress."
        breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Learning' }]}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Completed" value={completed} icon="CircleCheck" tone="success" />
        <StatCard label="In progress" value={inProgress} icon="Clock3" tone="warning" />
        <StatCard label="Avg score" value={`${avgScore}%`} icon="Star" tone="brand" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {myCourses.map((c) => (
          <Card key={c.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                    <Icon name="GraduationCap" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.category}</p>
                  </div>
                </div>
                <Badge variant={c.status === 'Completed' ? 'secondary' : c.status === 'In Progress' ? 'outline' : 'outline'}>{c.status}</Badge>
              </div>
              {c.progress > 0 && (
                <div className="mt-4 border-t pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{c.score !== null ? `Score: ${c.score}%` : 'In progress'}</span>
                    <span className="font-medium">{c.progress}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${c.progress >= 100 ? 'bg-success-500' : 'bg-brand-500'}`} style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
              )}
              {c.status !== 'Completed' && (
                <div className="mt-3"><Button variant="outline" size="sm" className="w-full"><Icon name="PlayCircle" className="mr-2 h-3.5 w-3.5" />{c.status === 'In Progress' ? 'Continue' : 'Start course'}</Button></div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
