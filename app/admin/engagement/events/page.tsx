'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { FormDrawer } from '@/components/shared/form-drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { companyEvents } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

const typeColors: Record<string, string> = {
  Company: 'border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-800 dark:bg-brand-500/10 dark:text-brand-300',
  Team: 'border-info-200 bg-info-50 text-info-700 dark:border-info-800 dark:bg-info-500/10 dark:text-info-300',
  Onboarding: 'border-success-200 bg-success-50 text-success-700 dark:border-success-800 dark:bg-success-500/10 dark:text-success-300',
  Wellness: 'border-warning-200 bg-warning-50 text-warning-700 dark:border-warning-800 dark:bg-warning-500/10 dark:text-warning-300',
};

export default function EventsPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <PageHeader
        title="Events"
        description="Company events, team offsites, and social activities."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Engagement' }, { label: 'Events' }]}
        action={{ label: 'New event', icon: 'Plus', onClick: () => setOpen(true) }}
      />
      <div className="space-y-4">
        {companyEvents.map((e) => (
          <Card key={e.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                  <span className="text-xs font-medium">{new Date(e.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                  <span className="text-lg font-bold leading-none">{new Date(e.date).getDate()}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{e.title}</p>
                    <Badge variant="secondary" className={typeColors[e.type] ?? ''}>{e.type}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{e.time} · {e.location} · {e.attendees} attending</p>
                </div>
              </div>
              <Button variant="outline" size="sm"><Icon name="Eye" className="mr-1.5 h-3.5 w-3.5" />Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <FormDrawer
        open={open}
        onOpenChange={setOpen}
        title="New Event"
        description="Create a new company or team event."
        onSubmit={() => setOpen(false)}
        submitLabel="Create"
      >
        <div className="space-y-2"><Label>Event title</Label><Input placeholder="e.g. Team Offsite" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Date</Label><Input type="date" /></div>
          <div className="space-y-2"><Label>Time</Label><Input placeholder="10:00 AM" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Location</Label><Input placeholder="e.g. SF HQ" /></div>
          <div className="space-y-2"><Label>Type</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>Company</option><option>Team</option><option>Onboarding</option><option>Wellness</option></select></div>
        </div>
      </FormDrawer>
    </div>
  );
}
