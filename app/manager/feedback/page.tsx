'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { FormDrawer } from '@/components/shared/form-drawer';
import { Label } from '@/components/ui/label';
import { employees } from '@/lib/mock-data';
import { relativeTime } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';

type Feedback = { id: string; from: string; to: string; type: string; message: string; date: string };

const initialFeedback: Feedback[] = [
  { id: 'fb1', from: 'Sarah Chen', to: 'David Kim', type: 'Positive', message: 'Great work on the API migration — shipped ahead of schedule with zero downtime.', date: '2025-07-26' },
  { id: 'fb2', from: 'Sarah Chen', to: 'Priya Sharma', type: 'Constructive', message: 'Consider improving response times on code review requests to unblock the team faster.', date: '2025-07-22' },
  { id: 'fb3', from: 'Sarah Chen', to: 'Alex Turner', type: 'Positive', message: 'Excellent presentation to the client — they were very impressed with the demo.', date: '2025-07-18' },
];

const typeColors: Record<string, string> = {
  Positive: 'border-success-200 bg-success-50 text-success-700 dark:border-success-800 dark:bg-success-500/10 dark:text-success-300',
  Constructive: 'border-warning-200 bg-warning-50 text-warning-700 dark:border-warning-800 dark:bg-warning-500/10 dark:text-warning-300',
};

export default function ManagerFeedbackPage() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = React.useState<Feedback[]>(initialFeedback);
  const [form, setForm] = React.useState({ to: '', type: 'Positive', message: '' });
  const team = employees.filter((e) => e.manager === 'Sarah Chen');

  const handleSubmit = () => {
    if (!form.to || !form.message) {
      toast({ title: 'Please fill all fields', description: 'Recipient and message are required.', variant: 'destructive' });
      return;
    }
    const newFb: Feedback = {
      id: `fb${Date.now()}`,
      from: 'Sarah Chen',
      to: form.to,
      type: form.type,
      message: form.message,
      date: new Date().toISOString().slice(0, 10),
    };
    setFeedback((prev) => [newFb, ...prev]);
    setForm({ to: '', type: 'Positive', message: '' });
    setOpen(false);
    toast({ title: 'Feedback sent', description: `${form.to} has received your ${form.type.toLowerCase()} feedback.` });
  };

  return (
    <div>
      <PageHeader title="Give Feedback" description="Share recognition and constructive feedback with your team members." breadcrumbs={[{ label: 'Manager', href: '/manager/dashboard' }, { label: 'Feedback' }]} action={{ label: 'New feedback', icon: 'Plus', onClick: () => setOpen(true) }} />

      <div className="space-y-4">
        {feedback.map((f) => (
          <Card key={f.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex -space-x-2">
                  <AvatarBadge name={f.from} size="sm" className="ring-2 ring-card" />
                  <AvatarBadge name={f.to} size="sm" className="ring-2 ring-card" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm"><span className="font-medium">{f.from}</span> <span className="text-muted-foreground">gave feedback to</span> <span className="font-medium">{f.to}</span></span>
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${typeColors[f.type] ?? ''}`}>{f.type}</span>
                  </div>
                  <p className="mt-2 text-sm">{f.message}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{relativeTime(f.date)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <FormDrawer open={open} onOpenChange={setOpen} title="Give Feedback" description="Share feedback with a team member." onSubmit={handleSubmit} submitLabel="Send">
        <div className="space-y-2">
          <Label>To</Label>
          <select value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            <option value="">Select team member...</option>
            {team.map((m) => <option key={m.id} value={`${m.firstName} ${m.lastName}`}>{m.firstName} {m.lastName}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Type</Label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
            <option>Positive</option><option>Constructive</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>Message</Label>
          <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Write your feedback..." />
        </div>
      </FormDrawer>
    </div>
  );
}
