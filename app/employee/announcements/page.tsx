'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/shared/icon';
import { announcements } from '@/lib/mock-data';
import { relativeTime } from '@/lib/format';

export default function EmployeeAnnouncementsPage() {
  return (
    <div>
      <PageHeader
        title="Announcements"
        description="Company news, updates, and important information."
        breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Announcements' }]}
      />
      <div className="space-y-4">
        {announcements.map((a) => (
          <Card key={a.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                  <Icon name="Megaphone" className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{a.title}</h3>
                    {a.pinned && <Badge variant="secondary" className="border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-800 dark:bg-brand-500/10 dark:text-brand-300"><Icon name="Star" className="mr-1 h-3 w-3" />Pinned</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{a.content}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>by {a.author}</span>
                    <span>{relativeTime(a.date)}</span>
                    {a.category && <Badge variant="outline">{a.category}</Badge>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
