'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/shared/icon';
import { holidays } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

export default function LeaveHolidaysPage() {
  return (
    <div>
      <PageHeader
        title="Holidays"
        description="Company-wide holidays that apply to all employees' leave calendars."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Leave' }, { label: 'Holidays' }]}
        action={{ label: 'Add holiday', icon: 'Plus' }}
      />
      <Card>
        <CardContent className="p-0">
          <div className="grid divide-y">
            {holidays.map((h) => (
              <div key={h.id} className="flex items-center gap-4 p-4 transition-colors hover:bg-accent">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                  <span className="text-xs font-medium">{new Date(h.date).toLocaleString('en-US', { month: 'short' })}</span>
                  <span className="text-lg font-bold leading-none">{new Date(h.date).getDate()}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{h.name}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(h.date, 'long')}</p>
                </div>
                <Badge variant="secondary">{h.type}</Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Edit3" className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
