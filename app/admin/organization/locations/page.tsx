'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { employees } from '@/lib/mock-data';

const locations = [
  { id: 'l1', name: 'San Francisco HQ', country: 'USA', employees: 142, timezone: 'PST (UTC-8)', address: '100 Market St, San Francisco, CA' },
  { id: 'l2', name: 'London Office', country: 'UK', employees: 88, timezone: 'GMT (UTC+0)', address: '25 Finsbury Circus, London' },
  { id: 'l3', name: 'Tokyo Office', country: 'Japan', employees: 56, timezone: 'JST (UTC+9)', address: '1-9-2 Marunouchi, Chiyoda, Tokyo' },
  { id: 'l4', name: 'Berlin Office', country: 'Germany', employees: 34, timezone: 'CET (UTC+1)', address: 'Friedrichstraße 68, Berlin' },
  { id: 'l5', name: 'Remote', country: 'Global', employees: 22, timezone: 'Various', address: 'Distributed workforce' },
];

export default function LocationsPage() {
  return (
    <div>
      <PageHeader
        title="Locations"
        description="Manage office locations, addresses, and timezones."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Organization' }, { label: 'Locations' }]}
        action={{ label: 'Add location', icon: 'Plus' }}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => (
          <Card key={loc.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                    <Icon name="MapPin" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{loc.name}</p>
                    <p className="text-xs text-muted-foreground">{loc.country}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="Edit3" className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Employees</span>
                  <span className="font-medium">{loc.employees}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Timezone</span>
                  <span className="font-medium">{loc.timezone}</span>
                </div>
                <div className="pt-1">
                  <p className="text-xs text-muted-foreground">{loc.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
