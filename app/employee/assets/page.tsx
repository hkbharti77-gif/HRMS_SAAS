'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { myAssets } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/format';

export default function EmployeeAssetsPage() {
  const totalValue = myAssets.reduce((s, a) => s + a.value, 0);

  return (
    <div>
      <PageHeader
        title="My Assets"
        description="Assets assigned to you by the company."
        breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Assets' }]}
        action={{ label: 'Request asset', icon: 'Plus', href: '/admin/assets/requests' }}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Assigned assets" value={myAssets.length} icon="Laptop" tone="brand" />
        <StatCard label="Total value" value={formatCurrency(totalValue, 'USD', true)} icon="Coins" tone="info" />
        <StatCard label="Requests" value="0" icon="PackagePlus" tone="warning" footer="pending" />
      </div>
      <div className="space-y-4">
        {myAssets.map((a) => (
          <Card key={a.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                  <Icon name={a.type === 'Laptop' ? 'Laptop' : a.type === 'Monitor' ? 'Box' : 'Wrench'} className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">{a.name}</p>
                  <p className="text-xs text-muted-foreground">Serial: {a.serial} · Assigned {formatDate(a.assignedOn, 'short')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{formatCurrency(a.value)}</span>
                <Button variant="outline" size="sm"><Icon name="Wrench" className="mr-1.5 h-3.5 w-3.5" />Report issue</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
