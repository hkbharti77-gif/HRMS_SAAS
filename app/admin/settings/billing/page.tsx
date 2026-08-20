'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { formatCurrency } from '@/lib/format';

const invoices = [
  { id: 'inv1', date: '2025-07-01', amount: 4200, status: 'Paid', method: 'Visa •••• 4242' },
  { id: 'inv2', date: '2025-06-01', amount: 4200, status: 'Paid', method: 'Visa •••• 4242' },
  { id: 'inv3', date: '2025-05-01', amount: 3800, status: 'Paid', method: 'Visa •••• 4242' },
  { id: 'inv4', date: '2025-04-01', amount: 3800, status: 'Paid', method: 'Visa •••• 4242' },
];

export default function BillingSettingsPage() {
  return (
    <div>
      <PageHeader
        title="Billing"
        description="Manage subscription, payment methods, and invoices."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Settings' }, { label: 'Billing' }]}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Current plan" value="Growth" icon="Tags" tone="brand" footer="$4,200/mo" />
        <StatCard label="Next billing" value="Aug 1" icon="CalendarClock" tone="info" footer="2025" />
        <StatCard label="Payment method" value="Visa" icon="CreditCard" tone="success" footer="•••• 4242" />
      </div>

      <Card className="mb-4">
        <CardHeader><CardTitle className="text-base">Current Plan</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-semibold">Growth Plan</p>
              <p className="text-sm text-muted-foreground">{formatCurrency(4200)}/month · 342 employees · $12.28/employee</p>
            </div>
            <Button variant="outline"><Icon name="ArrowLeftRight" className="mr-2 h-4 w-4" />Change plan</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Invoice History</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {invoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">{inv.date}</p>
                <p className="text-xs text-muted-foreground">{inv.method}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{formatCurrency(inv.amount)}</span>
                <span className="text-xs text-success-600">{inv.status}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Download" className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
