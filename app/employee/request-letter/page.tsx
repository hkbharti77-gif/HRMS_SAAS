'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { requestLetterTypes } from '@/lib/mock-data';

export default function EmployeeRequestLetterPage() {
  return (
    <div>
      <PageHeader
        title="Request Letter"
        description="Request official letters and certificates from HR."
        breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Request Letter' }]}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {requestLetterTypes.map((l) => (
          <Card key={l.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                  <Icon name={l.icon} className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">{l.type}</p>
                  <p className="text-xs text-muted-foreground">{l.description}</p>
                  <Badge variant="outline" className="mt-1"><Icon name="Clock3" className="mr-1 h-3 w-3" />{l.processingTime}</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm"><Icon name="Send" className="mr-1.5 h-3.5 w-3.5" />Request</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
