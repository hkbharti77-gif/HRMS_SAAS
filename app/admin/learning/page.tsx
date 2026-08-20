'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { courses } from '@/lib/mock-data';

export default function CoursesPage() {
  const totalEnrolled = courses.reduce((s, c) => s + c.enrolled, 0);
  const totalCompleted = courses.reduce((s, c) => s + c.completions, 0);
  const mandatory = courses.filter((c) => c.mandatory).length;

  return (
    <div>
      <PageHeader
        title="Courses"
        description="Manage training courses, track enrollment and completion."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Learning' }]}
        action={{ label: 'Add course', icon: 'Plus' }}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total courses" value={courses.length} icon="BookOpen" tone="brand" />
        <StatCard label="Total enrollments" value={totalEnrolled} icon="Users" tone="info" />
        <StatCard label="Completions" value={totalCompleted} icon="CircleCheck" tone="success" footer={`${mandatory} mandatory`} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {courses.map((c) => {
          const rate = Math.round((c.completions / c.enrolled) * 100) || 0;
          return (
            <Card key={c.id} className="transition-shadow hover:shadow-soft">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                      <Icon name="GraduationCap" className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{c.title}</p>
                      <p className="text-xs text-muted-foreground">{c.category} · {c.duration}</p>
                    </div>
                  </div>
                  {c.mandatory && <Badge variant="secondary" className="border-warning-200 bg-warning-50 text-warning-700 dark:border-warning-800 dark:bg-warning-500/10 dark:text-warning-300">Mandatory</Badge>}
                </div>
                <div className="mt-4 border-t pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{c.enrolled} enrolled · {c.completions} completed</span>
                    <span className="font-medium">{rate}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-brand-500" style={{ width: `${rate}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
