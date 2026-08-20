'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { integrations } from '@/lib/mock-data';

export default function IntegrationsSettingsPage() {
  return (
    <div>
      <PageHeader
        title="Integrations"
        description="Connect third-party services to extend platform functionality."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Settings' }, { label: 'Integrations' }]}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {integrations.map((i) => (
          <Card key={i.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                  <Icon name={i.icon} className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{i.name}</p>
                    <Badge variant="secondary">{i.category}</Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{i.description}</p>
                </div>
              </div>
              {i.connected ? (
                <div className="flex flex-col items-end gap-1">
                  <Badge variant="secondary" className="border-success-200 bg-success-50 text-success-700 dark:border-success-800 dark:bg-success-500/10 dark:text-success-300"><Icon name="CircleCheck" className="mr-1 h-3 w-3" />Connected</Badge>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-danger-600">Disconnect</Button>
                </div>
              ) : (
                <Button variant="outline" size="sm"><Icon name="Plus" className="mr-1.5 h-3.5 w-3.5" />Connect</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
