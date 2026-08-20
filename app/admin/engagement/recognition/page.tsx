'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent } from '@/components/ui/card';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { FormDrawer } from '@/components/shared/form-drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { recognitionEntries } from '@/lib/mock-data';
import { relativeTime } from '@/lib/format';

export default function RecognitionPage() {
  const [open, setOpen] = React.useState(false);
  const totalPoints = recognitionEntries.reduce((s, r) => s + r.points, 0);

  const awardColors: Record<string, string> = {
    'Innovation Star': 'border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-800 dark:bg-brand-500/10 dark:text-brand-300',
    'Rising Star': 'border-success-200 bg-success-50 text-success-700 dark:border-success-800 dark:bg-success-500/10 dark:text-success-300',
    'Team Player': 'border-info-200 bg-info-50 text-info-700 dark:border-info-800 dark:bg-info-500/10 dark:text-info-300',
    'Excellence': 'border-warning-200 bg-warning-50 text-warning-700 dark:border-warning-800 dark:bg-warning-500/10 dark:text-warning-300',
    'Above & Beyond': 'border-danger-200 bg-danger-50 text-danger-700 dark:border-danger-800 dark:bg-danger-500/10 dark:text-danger-300',
  };

  return (
    <div>
      <PageHeader
        title="Recognition"
        description="Peer-to-peer recognition and reward points."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Engagement' }, { label: 'Recognition' }]}
        action={{ label: 'Recognize', icon: 'Plus', onClick: () => setOpen(true) }}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total awards" value={recognitionEntries.length} icon="Award" tone="brand" />
        <StatCard label="Points awarded" value={totalPoints} icon="Star" tone="warning" />
        <StatCard label="Unique recipients" value={new Set(recognitionEntries.map((r) => r.to)).size} icon="Users" tone="success" />
      </div>
      <div className="space-y-4">
        {recognitionEntries.map((r) => (
          <Card key={r.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex -space-x-2">
                  <AvatarBadge name={r.from} size="sm" className="ring-2 ring-card" />
                  <AvatarBadge name={r.to} size="sm" className="ring-2 ring-card" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm"><span className="font-medium">{r.from}</span> <span className="text-muted-foreground">recognized</span> <span className="font-medium">{r.to}</span></span>
                    <Badge variant="secondary" className={awardColors[r.award] ?? ''}><Icon name="Award" className="mr-1 h-3 w-3" />{r.award}</Badge>
                  </div>
                  <p className="mt-2 text-sm">{r.message}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{relativeTime(r.date)}</span>
                    <span className="flex items-center gap-1"><Icon name="Star" className="h-3 w-3 text-warning-500" />{r.points} points</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <FormDrawer
        open={open}
        onOpenChange={setOpen}
        title="Recognize a Colleague"
        description="Award a colleague for their contribution."
        onSubmit={() => setOpen(false)}
        submitLabel="Send"
      >
        <div className="space-y-2"><Label>To</Label><Input placeholder="Search employee..." /></div>
        <div className="space-y-2"><Label>Award</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>Innovation Star</option><option>Rising Star</option><option>Team Player</option><option>Excellence</option><option>Above & Beyond</option></select></div>
        <div className="space-y-2"><Label>Message</Label><textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Write your recognition message..." /></div>
        <div className="space-y-2"><Label>Points</Label><Input type="number" defaultValue={50} /></div>
      </FormDrawer>
    </div>
  );
}
