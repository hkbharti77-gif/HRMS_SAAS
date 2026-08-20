'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { myDocuments } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

export default function EmployeeDocumentsPage() {
  return (
    <div>
      <PageHeader
        title="My Documents"
        description="View and upload your employment documents."
        breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Documents' }]}
        action={{ label: 'Upload document', icon: 'Upload' }}
      />
      <div className="space-y-3">
        {myDocuments.map((d) => (
          <Card key={d.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                  <Icon name="FileText" className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">{d.type}</p>
                  <p className="text-xs text-muted-foreground">{d.fileName} · Uploaded {formatDate(d.uploadedOn, 'short')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={d.status === 'Verified' ? 'secondary' : 'outline'} className={d.status === 'Verified' ? 'border-success-200 bg-success-50 text-success-700 dark:border-success-800 dark:bg-success-500/10 dark:text-success-300' : ''}>{d.status}</Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Download" className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
