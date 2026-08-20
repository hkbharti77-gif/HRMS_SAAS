'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { myTickets } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';

type Ticket = (typeof myTickets)[number];

export default function EmployeeHelpdeskPage() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [tickets, setTickets] = React.useState<Ticket[]>(myTickets);
  const [form, setForm] = React.useState({ subject: '', category: 'IT Hardware', priority: 'Low', description: '' });

  const handleSubmit = () => {
    if (!form.subject || !form.description) {
      toast({ title: 'Please fill all fields', description: 'Subject and description are required.', variant: 'destructive' });
      return;
    }
    const newTicket: Ticket = {
      id: `mtk${Date.now()}`,
      subject: form.subject,
      category: form.category,
      priority: form.priority,
      status: 'Open',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setTickets((prev) => [newTicket, ...prev]);
    setForm({ subject: '', category: 'IT Hardware', priority: 'Low', description: '' });
    setOpen(false);
    toast({ title: 'Ticket created', description: `"${form.subject}" — our team will respond within 4 hours.` });
  };

  const openCount = tickets.filter((t) => t.status === 'Open').length;
  const resolved = tickets.filter((t) => t.status === 'Resolved' || t.status === 'Closed').length;

  const columns: Column<Ticket>[] = [
    { key: 'subject', header: 'Subject', sortable: true, sortValue: (r) => r.subject, cell: (r) => <span className="font-medium">{r.subject}</span> },
    { key: 'category', header: 'Category', sortable: true, sortValue: (r) => r.category, cell: (r) => <span className="text-muted-foreground">{r.category}</span>, hideOnMobile: true },
    { key: 'priority', header: 'Priority', sortable: true, sortValue: (r) => r.priority, cell: (r) => <StatusBadge status={r.priority} dot /> },
    { key: 'status', header: 'Status', sortable: true, sortValue: (r) => r.status, cell: (r) => <StatusBadge status={r.status} dot /> },
    { key: 'createdAt', header: 'Created', sortable: true, sortValue: (r) => r.createdAt, cell: (r) => <span className="text-muted-foreground">{formatDate(r.createdAt, 'short')}</span>, hideOnMobile: true },
  ];

  return (
    <div>
      <PageHeader title="Helpdesk" description="Raise support tickets and track their status." breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Helpdesk' }]} action={{ label: 'New ticket', icon: 'Plus', onClick: () => setOpen(true) }} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Open tickets" value={openCount} icon="Ticket" tone="warning" />
        <StatCard label="Resolved" value={resolved} icon="CircleCheck" tone="success" />
        <StatCard label="Avg response" value="2.5h" icon="Clock3" tone="info" />
      </div>
      <DataTable columns={columns} data={tickets} searchKeys={['subject', 'category', 'status', 'priority']} searchPlaceholder="Search tickets..." initialSort={{ key: 'createdAt', dir: 'desc' }} />

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-elevated" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">New Ticket</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(false)}><Icon name="X" className="h-4 w-4" /></Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Subject</label>
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" placeholder="Brief description" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                    <option>IT Hardware</option><option>IT Software</option><option>Payroll</option><option>Leave</option><option>Facilities</option><option>Finance</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Priority</label>
                  <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                    <option>Low</option><option>Medium</option><option>High</option><option>Urgent</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Describe the issue..." />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit}><Icon name="Send" className="mr-2 h-4 w-4" />Submit</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
