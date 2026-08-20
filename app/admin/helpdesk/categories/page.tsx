'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { helpdeskCategories } from '@/lib/mock-data';

export default function HelpdeskCategoriesPage() {
  return (
    <div>
      <PageHeader
        title="Categories & SLA"
        description="Configure ticket categories, SLA targets, and resolution metrics."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Helpdesk' }, { label: 'Categories' }]}
        action={{ label: 'Add category', icon: 'Plus' }}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {helpdeskCategories.map((c) => {
          const rate = Math.round((c.resolved / c.tickets) * 100);
          return (
            <Card key={c.id} className="transition-shadow hover:shadow-soft">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-xs text-muted-foreground">SLA target: {c.sla}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Edit3" className="h-4 w-4" /></Button>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Total tickets</p>
                    <p className="mt-1 text-lg font-semibold">{c.tickets}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Resolved</p>
                    <p className="mt-1 text-lg font-semibold text-success-600">{c.resolved}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg time</p>
                    <p className="mt-1 text-lg font-semibold">{c.avgResolution}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Resolution rate</span>
                    <span className="font-medium">{rate}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${rate >= 80 ? 'bg-success-500' : rate >= 60 ? 'bg-warning-500' : 'bg-danger-500'}`} style={{ width: `${rate}%` }} />
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
