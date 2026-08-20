'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Icon } from '@/components/shared/icon';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { FormDrawer } from '@/components/shared/form-drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { platformAnnouncements } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

export default function SuperAdminAnnouncementsPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <PageHeader
        title="Announcements"
        description="Broadcast messages to all tenants — maintenance, new features, and more."
        breadcrumbs={[{ label: 'Super Admin', href: '/super-admin/dashboard' }, { label: 'Announcements' }]}
        action={{ label: 'New announcement', icon: 'Megaphone', onClick: () => setOpen(true) }}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total sent" value="142" icon="Megaphone" tone="brand" />
        <StatCard label="This month" value="7" icon="CalendarDays" tone="info" />
        <StatCard label="Drafts" value={platformAnnouncements.filter((a) => a.status === 'Draft').length} icon="Edit3" tone="warning" />
      </div>

      <div className="space-y-3">
        {platformAnnouncements.map((a) => (
          <Card key={a.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{a.title}</h3>
                    <StatusBadge status={a.status} dot />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{a.message}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Users" className="h-3.5 w-3.5" />
                      {a.audience}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="CalendarDays" className="h-3.5 w-3.5" />
                      {formatDate(a.date)}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  {a.status === 'Draft' && (
                    <Button size="sm">
                      <Icon name="Send" className="mr-1.5 h-4 w-4" />
                      Send now
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon name="MoreHorizontal" className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <FormDrawer
        open={open}
        onOpenChange={setOpen}
        title="New Announcement"
        description="This will be visible to all selected tenants immediately."
        onSubmit={() => setOpen(false)}
        submitLabel="Send announcement"
        width="lg"
      >
        <div className="space-y-2">
          <Label>Title</Label>
          <Input placeholder="e.g. Scheduled maintenance — Aug 10" />
        </div>
        <div className="space-y-2">
          <Label>Message</Label>
          <textarea
            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Write your announcement..."
          />
        </div>
        <div className="space-y-2">
          <Label>Audience</Label>
          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            {['All tenants', 'Starter plan', 'Growth & above', 'Pro & Enterprise', 'Enterprise only'].map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </FormDrawer>
    </div>
  );
}
