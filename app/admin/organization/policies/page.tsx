'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/shared/icon';
import { orgPolicies } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import { StatusBadge } from '@/components/shared/status-badge';

export default function PoliciesPage() {
  return (
    <div>
      <PageHeader
        title="Policies"
        description="Company HR policies and their versions — maintain and distribute to employees."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Organization' }, { label: 'Policies' }]}
        action={{ label: 'Add policy', icon: 'Plus' }}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {orgPolicies.map((p) => (
          <Card key={p.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                      <Icon name="FileText" className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.category}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{p.summary}</p>
                </div>
                <StatusBadge status={p.status} dot />
              </div>
              <div className="mt-4 flex items-center justify-between border-t pt-3">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="GitBranch" className="h-3.5 w-3.5" />
                    v{p.version}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="CalendarDays" className="h-3.5 w-3.5" />
                    {formatDate(p.lastUpdated, 'short')}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon name="Eye" className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon name="Edit3" className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
