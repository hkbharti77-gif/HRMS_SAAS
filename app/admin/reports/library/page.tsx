'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { reportLibrary } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

export default function ReportLibraryPage() {
  return (
    <div>
      <PageHeader
        title="Report Library"
        description="Saved and scheduled reports across all modules."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Reports' }, { label: 'Library' }]}
        action={{ label: 'Build report', icon: 'Wrench', href: '/admin/reports' }}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {reportLibrary.map((r) => (
          <Card key={r.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                  <Icon name="Library" className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary">{r.category}</Badge>
                    <span>{r.schedule}</span>
                    <span>Last run: {formatDate(r.lastRun, 'short')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{r.format}</Badge>
                <Button variant="outline" size="sm"><Icon name="Download" className="mr-1.5 h-3.5 w-3.5" />Run</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
