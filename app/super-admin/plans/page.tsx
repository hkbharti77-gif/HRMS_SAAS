'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/shared/icon';
import { StatusBadge } from '@/components/shared/status-badge';
import { platformPlans } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/format';

export default function PlansPricingPage() {
  return (
    <div>
      <PageHeader
        title="Plans & Pricing"
        description="Define pricing tiers and what modules each plan includes."
        breadcrumbs={[{ label: 'Super Admin', href: '/super-admin/dashboard' }, { label: 'Plans' }]}
        action={{ label: 'Add plan', icon: 'Plus' }}
      />

      <div className="grid gap-4 lg:grid-cols-4">
        {platformPlans.map((plan) => (
          <Card key={plan.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <StatusBadge status={plan.status} dot />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">
                  {plan.price === 0 ? 'Free' : formatCurrency(plan.price)}
                </span>
                {plan.price > 0 && (
                  <span className="text-xs text-muted-foreground">{plan.perUnit}</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{plan.employees} employees</p>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Included modules</p>
                <ul className="space-y-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Icon name="Check" className="mt-0.5 h-4 w-4 shrink-0 text-success-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t pt-3">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{plan.tenants}</span> tenants on this plan
                </p>
              </div>
              <div className="flex gap-2 pt-1">
                <Button variant="outline" size="sm" className="flex-1">
                  <Icon name="Edit3" className="mr-1.5 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <Icon name="Eye" className="mr-1.5 h-4 w-4" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
