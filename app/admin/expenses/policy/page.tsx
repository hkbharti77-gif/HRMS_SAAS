'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { expenseCategories } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/format';

export default function ExpensePolicyPage() {
  return (
    <div>
      <PageHeader
        title="Policy & Categories"
        description="Configure expense categories, limits, and approval rules."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Expenses' }, { label: 'Policy' }]}
        action={{ label: 'Add category', icon: 'Plus' }}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {expenseCategories.map((c) => (
          <Card key={c.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${c.color}15`, color: c.color }}>
                    <Icon name="Wallet" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-xs text-muted-foreground">Monthly limit: {formatCurrency(c.limit)}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Edit3" className="h-4 w-4" /></Button>
              </div>
              <div className="mt-4 border-t pt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Approval required</span>
                  <Badge variant={c.approvalRequired ? 'secondary' : 'outline'}>{c.approvalRequired ? 'Yes' : 'No'}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
