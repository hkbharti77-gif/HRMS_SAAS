'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { FormDrawer } from '@/components/shared/form-drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { tickets as initialTickets } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import type { Ticket } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function TicketsPage() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [tickets, setTickets] = React.useState<Ticket[]>(initialTickets);
  const [form, setForm] = React.useState({ subject: '', category: 'IT Hardware', priority: 'Low', description: '' });

  const handleSubmit = () => {
    if (!form.subject || !form.description) {
      toast({ title: 'Please fill all fields', description: 'Subject and description are required.', variant: 'destructive' });
      return;
    }
    const newTicket: Ticket = {
      id: `tk${Date.now()}`,
      subject: form.subject,
      category: form.category,
      raisedBy: 'Admin',
      priority: form.priority as Ticket['priority'],
      status: 'Open',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setTickets((prev) => [newTicket, ...prev]);
    setForm({ subject: '', category: 'IT Hardware', priority: 'Low', description: '' });
    setOpen(false);
    toast({ title: 'Ticket created', description: 'The support team has been notified.' });
  };

  const handleResolve = (id: string) => {
    setTickets((prev) => prev.map((t) => t.id === id ? { ...t, status: 'Resolved' } : t));
    toast({ title: 'Ticket resolved', description: 'The employee has been notified.' });
  };

  const columns: Column<Ticket>[] = [
    { key: 'subject', header: 'Subject', sortable: true, sortValue: (r) => r.subject, cell: (r) => <span className="font-medium">{r.subject}</span> },
    { key: 'category', header: 'Category', sortable: true, sortValue: (r) => r.category, cell: (r) => <span className="text-muted-foreground">{r.category}</span>, hideOnMobile: true },
    { key: 'raisedBy', header: 'Raised By', sortable: true, sortValue: (r) => r.raisedBy, cell: (r) => (<div className="flex items-center gap-2"><AvatarBadge name={r.raisedBy} size="sm" /><span className="text-sm">{r.raisedBy}</span></div>) },
    { key: 'priority', header: 'Priority', sortable: true, sortValue: (r) => r.priority, cell: (r) => <StatusBadge status={r.priority} dot /> },
    { key: 'status', header: 'Status', sortable: true, sortValue: (r) => r.status, cell: (r) => <StatusBadge status={r.status} dot /> },
    { key: 'createdAt', header: 'Created', sortable: true, sortValue: (r) => r.createdAt, cell: (r) => <span className="text-muted-foreground">{formatDate(r.createdAt, 'short')}</span>, hideOnMobile: true },
    { key: 'actions', header: '', cell: (r) => r.status === 'Open' || r.status === 'In Progress' ? (<Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleResolve(r.id)}><Icon name="CircleCheck" className="mr-1 h-3.5 w-3.5" />Resolve</Button>) : <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Eye" className="h-4 w-4" /></Button> },
  ];

  return (
    <div>
      <PageHeader title="All Tickets" description="Manage and resolve employee support tickets." breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Helpdesk' }, { label: 'Tickets' }]} action={{ label: 'New ticket', icon: 'Plus', onClick: () => setOpen(true) }} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Open" value={tickets.filter((t) => t.status === 'Open' || t.status === 'In Progress').length} icon="Ticket" tone="warning" />
        <StatCard label="Resolved" value={tickets.filter((t) => t.status === 'Resolved' || t.status === 'Closed').length} icon="CircleCheck" tone="success" />
        <StatCard label="High priority" value={tickets.filter((t) => t.priority === 'High' || t.priority === 'Urgent').length} icon="AlertTriangle" tone="danger" />
      </div>
      <DataTable columns={columns} data={tickets} searchKeys={['subject', 'category', 'raisedBy', 'status', 'priority']} searchPlaceholder="Search tickets..." initialSort={{ key: 'createdAt', dir: 'desc' }} />

      <FormDrawer open={open} onOpenChange={setOpen} title="New Ticket" description="Create a new support ticket." onSubmit={handleSubmit} submitLabel="Submit">
        <div className="space-y-2"><Label>Subject</Label><Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Brief description of the issue" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Category</Label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>IT Hardware</option><option>IT Software</option><option>Payroll</option><option>Leave</option><option>Facilities</option><option>Finance</option></select></div>
          <div className="space-y-2"><Label>Priority</Label><select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select></div>
        </div>
        <div className="space-y-2"><Label>Description</Label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Describe the issue in detail..." /></div>
      </FormDrawer>
    </div>
  );
}
