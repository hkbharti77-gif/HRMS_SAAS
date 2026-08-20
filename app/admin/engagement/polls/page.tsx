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
import { polls } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

export default function PollsPage() {
  const [open, setOpen] = React.useState(false);
  const [selectedPoll, setSelectedPoll] = React.useState<string | null>(null);

  return (
    <div>
      <PageHeader
        title="Polls"
        description="Create quick polls to gather employee opinions."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Engagement' }, { label: 'Polls' }]}
        action={{ label: 'New poll', icon: 'Plus', onClick: () => setOpen(true) }}
      />
      <div className="space-y-4">
        {polls.map((p) => {
          const isSelected = selectedPoll === p.id;
          return (
            <Card key={p.id} className="transition-shadow hover:shadow-soft">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{p.question}</p>
                  <Badge variant="secondary">{p.status}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{p.totalVotes} votes · Closes {formatDate(p.closesOn, 'short')}</p>
                <div className="mt-4 space-y-2">
                  {p.options.map((opt) => {
                    const pct = p.totalVotes > 0 ? Math.round((opt.votes / p.totalVotes) * 100) : 0;
                    return (
                      <div key={opt.text} className="rounded-lg border p-3">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{opt.text}</span>
                          <span className="text-muted-foreground">{opt.votes} ({pct}%)</span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-brand-500" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <FormDrawer
        open={open}
        onOpenChange={setOpen}
        title="New Poll"
        description="Create a poll to gather employee opinions."
        onSubmit={() => setOpen(false)}
        submitLabel="Publish"
      >
        <div className="space-y-2"><Label>Question</Label><Input placeholder="What do you want to ask?" /></div>
        <div className="space-y-2"><Label>Options</Label><Input placeholder="Option 1" /></div>
        <Input placeholder="Option 2" />
        <Input placeholder="Option 3" />
        <Input placeholder="Option 4 (optional)" />
        <div className="space-y-2"><Label>Closes on</Label><Input type="date" /></div>
      </FormDrawer>
    </div>
  );
}
