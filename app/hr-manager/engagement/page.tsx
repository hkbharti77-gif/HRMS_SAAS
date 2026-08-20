'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { FormDrawer } from '@/components/shared/form-drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { announcements as initialAnnouncements } from '@/lib/mock-data';
import { relativeTime } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';

type Announcement = (typeof initialAnnouncements)[number];

export default function HrManagerEngagementPage() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [announcements, setAnnouncements] = React.useState<Announcement[]>(initialAnnouncements);
  const [form, setForm] = React.useState({ title: '', category: 'HR', content: '', pinned: false });

  const handleSubmit = () => {
    if (!form.title || !form.content) {
      toast({ title: 'Please fill all fields', description: 'Title and content are required.', variant: 'destructive' });
      return;
    }
    const newAnn: Announcement = { id: `an${Date.now()}`, title: form.title, content: form.content, author: 'HR Manager', date: new Date().toISOString().slice(0, 10), pinned: form.pinned, category: form.category };
    setAnnouncements((prev) => [newAnn, ...prev]);
    setForm({ title: '', category: 'HR', content: '', pinned: false });
    setOpen(false);
    toast({ title: 'Announcement published', description: 'All employees will see this in their dashboard.' });
  };

  return (
    <div>
      <PageHeader title="Engagement" description="Share announcements, run surveys, and recognize employees." breadcrumbs={[{ label: 'HR Manager', href: '/hr-manager/dashboard' }, { label: 'Engagement' }]} action={{ label: 'New announcement', icon: 'Plus', onClick: () => setOpen(true) }} />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Announcements" value={announcements.length} icon="Megaphone" tone="brand" footer="this quarter" />
        <StatCard label="Survey responses" value="78%" icon="BarChart3" tone="success" footer="participation rate" />
        <StatCard label="Recognitions" value="24" icon="Award" tone="warning" footer="given this month" />
      </div>

      <div className="space-y-4">
        {announcements.map((a) => (
          <Card key={a.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10"><Icon name="Megaphone" className="h-5 w-5" /></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{a.title}</h3>
                    {a.pinned && <Badge variant="secondary" className="border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-800 dark:bg-brand-500/10 dark:text-brand-300"><Icon name="Star" className="mr-1 h-3 w-3" />Pinned</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{a.content}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground"><span>by {a.author}</span><span>{relativeTime(a.date)}</span><Badge variant="outline">{a.category}</Badge></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <FormDrawer open={open} onOpenChange={setOpen} title="New Announcement" description="Share an update with all employees." onSubmit={handleSubmit} submitLabel="Publish">
        <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Announcement title" /></div>
        <div className="space-y-2"><Label>Category</Label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>HR</option><option>Company</option><option>Policy</option><option>Event</option></select></div>
        <div className="space-y-2"><Label>Content</Label><textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Write your announcement..." /></div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.pinned} onChange={(e) => setForm({ ...form, pinned: e.target.checked })} className="h-4 w-4 rounded" /><span>Pin to top</span></label>
      </FormDrawer>
    </div>
  );
}
