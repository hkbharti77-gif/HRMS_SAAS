'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { FormDrawer } from '@/components/shared/form-drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { feedbackEntries } from '@/lib/mock-data';
import { relativeTime } from '@/lib/format';

export default function FeedbackPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <PageHeader
        title="Feedback Wall"
        description="Peer-to-peer recognition and constructive feedback across the organization."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Performance' }, { label: 'Feedback' }]}
        action={{ label: 'Give feedback', icon: 'Plus', onClick: () => setOpen(true) }}
      />
      <div className="space-y-4">
        {feedbackEntries.map((f) => (
          <Card key={f.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex -space-x-2">
                  <AvatarBadge name={f.from} size="sm" className="ring-2 ring-card" />
                  <AvatarBadge name={f.to} size="sm" className="ring-2 ring-card" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm"><span className="font-medium">{f.from}</span> <span className="text-muted-foreground">&rarr;</span> <span className="font-medium">{f.to}</span></span>
                    <Badge variant={f.type === 'Appreciation' ? 'secondary' : 'outline'} className={f.type === 'Appreciation' ? 'border-success-200 bg-success-50 text-success-700 dark:border-success-800 dark:bg-success-500/10 dark:text-success-300' : ''}>
                      {f.type === 'Appreciation' ? <Icon name="ThumbsUp" className="mr-1 h-3 w-3" /> : <Icon name="MessageSquare" className="mr-1 h-3 w-3" />}
                      {f.type}
                    </Badge>
                    {!f.isPublic && <Badge variant="outline" className="text-xs">Private</Badge>}
                  </div>
                  <p className="mt-2 text-sm text-foreground">{f.message}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{relativeTime(f.date)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <FormDrawer
        open={open}
        onOpenChange={setOpen}
        title="Give Feedback"
        description="Share appreciation or constructive feedback with a colleague."
        onSubmit={() => setOpen(false)}
        submitLabel="Send"
      >
        <div className="space-y-2"><Label>To</Label><Input placeholder="Search employee..." /></div>
        <div className="space-y-2"><Label>Type</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>Appreciation</option><option>Constructive</option></select></div>
        <div className="space-y-2"><Label>Message</Label><textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Write your feedback..." /></div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="h-4 w-4 rounded" /><span>Post publicly on feedback wall</span></label>
      </FormDrawer>
    </div>
  );
}
