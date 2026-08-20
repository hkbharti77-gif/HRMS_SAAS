'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadialGauge } from '@/components/shared/charts';

export default function EmployeeLeaveBalancePage() {
  const balances = [
    { type: 'Casual', total: 12, used: 6, color: '#2563eb' },
    { type: 'Sick', total: 12, used: 8, color: '#ef4444' },
    { type: 'Earned', total: 15, used: 3, color: '#22c55e' },
  ];

  return (
    <div>
      <PageHeader
        title="My Leave Balance"
        description="Overview of your leave entitlements and usage."
        breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Leave' }, { label: 'Balance' }]}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {balances.map((b) => {
          const remaining = b.total - b.used;
          const pct = Math.round((remaining / b.total) * 100);
          return (
            <Card key={b.type}>
              <CardHeader><CardTitle className="text-base">{b.type} Leave</CardTitle></CardHeader>
              <CardContent>
                <RadialGauge value={pct} label={`${remaining} days left`} color={b.color} height={180} />
                <div className="mt-3 grid grid-cols-3 gap-2 border-t pt-3 text-center">
                  <div><p className="text-xs text-muted-foreground">Total</p><p className="text-sm font-semibold">{b.total}</p></div>
                  <div><p className="text-xs text-muted-foreground">Used</p><p className="text-sm font-semibold">{b.used}</p></div>
                  <div><p className="text-xs text-muted-foreground">Left</p><p className="text-sm font-semibold text-success-600">{remaining}</p></div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
