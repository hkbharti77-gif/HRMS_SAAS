'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { candidates } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

const stages = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'] as const;

const stageColors: Record<string, string> = {
  Applied: 'border-l-muted-foreground/30',
  Screening: 'border-l-info-500',
  Interview: 'border-l-warning-500',
  Offer: 'border-l-brand-500',
  Hired: 'border-l-success-500',
  Rejected: 'border-l-danger-500',
};

export default function PipelinePage() {
  return (
    <div>
      <PageHeader
        title="Pipeline"
        description="Kanban view of all candidates moving through the hiring process."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Hiring' }, { label: 'Pipeline' }]}
        action={{ label: 'Add candidate', icon: 'Plus' }}
      />
      <div className="grid gap-4 overflow-x-auto lg:grid-cols-6">
        {stages.map((stage) => {
          const items = candidates.filter((c) => c.stage === stage);
          return (
            <div key={stage} className="min-w-[240px]">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{stage}</span>
                  <Badge variant="secondary" className="text-xs">{items.length}</Badge>
                </div>
              </div>
              <div className="space-y-3">
                {items.map((c) => (
                  <Card key={c.id} className={`border-l-4 ${stageColors[c.stage]} transition-shadow hover:shadow-soft`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <AvatarBadge name={c.name} size="sm" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{c.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{c.role}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{formatDate(c.appliedOn, 'short')}</span>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-0.5">
                            <Icon name="Star" className="h-3 w-3 text-warning-500" />
                            <span className="font-medium">{c.rating}</span>
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Icon name="Target" className="h-3 w-3 text-brand-500" />
                            <span className="font-medium">{c.matchScore}%</span>
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="outline" className="text-[10px]">{c.source}</Badge>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">View</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {items.length === 0 && (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <p className="text-xs text-muted-foreground">No candidates</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
