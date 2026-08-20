'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Icon } from '@/components/shared/icon';
import { StatusBadge } from '@/components/shared/status-badge';
import { featureFlags } from '@/lib/mock-data';

export default function FeatureFlagsPage() {
  const [flags, setFlags] = React.useState(featureFlags);

  const toggle = (id: string) =>
    setFlags((f) => f.map((x) => (x.id === id ? { ...x, enabled: !x.enabled } : x)));

  const categories = ['All', 'AI', 'Core', 'Security'];

  return (
    <div>
      <PageHeader
        title="Feature Flags"
        description="Toggle modules per plan or per tenant. Changes apply instantly."
        breadcrumbs={[{ label: 'Super Admin', href: '/super-admin/dashboard' }, { label: 'Feature Flags' }]}
        action={{ label: 'Add flag', icon: 'Plus' }}
      />

      <div className="grid gap-3">
        {flags.map((flag) => (
          <Card key={flag.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    flag.category === 'AI'
                      ? 'bg-violet-50 text-violet-600 dark:bg-violet-500/10'
                      : flag.category === 'Security'
                        ? 'bg-warning-50 text-warning-600 dark:bg-warning-500/10'
                        : 'bg-brand-50 text-brand-600 dark:bg-brand-500/10'
                  }`}
                >
                  <Icon name={flag.category === 'AI' ? 'Brain' : flag.category === 'Security' ? 'ShieldCheck' : 'Box'} className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{flag.feature}</p>
                    <Badge variant="secondary" className="text-xs">{flag.category}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Available on: {flag.plans.join(', ')} · {flag.tenants} tenants affected
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={flag.enabled ? 'Enabled' : 'Disabled'} tone={flag.enabled ? 'success' : 'neutral'} />
                <Switch checked={flag.enabled} onCheckedChange={() => toggle(flag.id)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
