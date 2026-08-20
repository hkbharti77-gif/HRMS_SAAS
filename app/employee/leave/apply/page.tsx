'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { myLeaveRequests } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';

type LeaveReq = (typeof myLeaveRequests)[number];

export default function EmployeeLeaveApplyPage() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [requests, setRequests] = React.useState<LeaveReq[]>(myLeaveRequests);
  const [form, setForm] = React.useState({ type: 'Casual', from: '', to: '', reason: '' });

  const handleSubmit = () => {
    if (!form.from || !form.to || !form.reason) {
      toast({ title: 'Please fill all fields', variant: 'destructive' });
      return;
    }
    const days = Math.max(1, Math.ceil((new Date(form.to).getTime() - new Date(form.from).getTime()) / 86400000) + 1);
    const newReq: LeaveReq = {
      id: `mlr${Date.now()}`,
      type: form.type,
      from: form.from,
      to: form.to,
      days,
      reason: form.reason,
      status: 'Pending',
      appliedOn: new Date().toISOString().slice(0, 10),
    };
    setRequests((prev) => [newReq, ...prev]);
    setForm({ type: 'Casual', from: '', to: '', reason: '' });
    setOpen(false);
    toast({ title: 'Leave request submitted', description: `${form.type} leave for ${days} day${days > 1 ? 's' : ''} — pending manager approval.` });
  };

  const columns: Column<LeaveReq>[] = [
    { key: 'type', header: 'Type', sortable: true, sortValue: (r) => r.type, cell: (r) => <span className="font-medium">{r.type}</span> },
    { key: 'from', header: 'From', sortable: true, sortValue: (r) => r.from, cell: (r) => <span className="text-muted-foreground">{formatDate(r.from, 'short')}</span> },
    { key: 'to', header: 'To', sortable: true, sortValue: (r) => r.to, cell: (r) => <span className="text-muted-foreground">{formatDate(r.to, 'short')}</span> },
    { key: 'days', header: 'Days', sortable: true, sortValue: (r) => r.days, cell: (r) => <span className="font-medium">{r.days}</span> },
    { key: 'reason', header: 'Reason', cell: (r) => <span className="text-muted-foreground line-clamp-1">{r.reason}</span>, hideOnMobile: true },
    { key: 'status', header: 'Status', sortable: true, sortValue: (r) => r.status, cell: (r) => <StatusBadge status={r.status} dot /> },
  ];

  return (
    <div>
      <PageHeader title="Apply Leave" description="Submit a new leave request and track existing ones." breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Leave' }, { label: 'Apply' }]} action={{ label: 'New request', icon: 'Plus', onClick: () => setOpen(true) }} />
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <StatCard label="Casual" value="6" icon="CalendarOff" tone="brand" footer="days left" />
        <StatCard label="Sick" value="4" icon="Heart" tone="danger" footer="days left" />
        <StatCard label="Earned" value="12" icon="CalendarCheck" tone="success" footer="days left" />
        <StatCard label="Unpaid" value="—" icon="CalendarDays" tone="warning" footer="on request" />
      </div>
      <DataTable columns={columns} data={requests} searchKeys={['type', 'reason', 'status']} searchPlaceholder="Search leave requests..." initialSort={{ key: 'appliedOn', dir: 'desc' }} />

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-elevated" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">New Leave Request</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(false)}><Icon name="X" className="h-4 w-4" /></Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Leave type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option>Casual</option><option>Sick</option><option>Earned</option><option>Unpaid</option><option>Maternity</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">From</label>
                  <input type="date" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">To</label>
                  <input type="date" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Reason</label>
                <textarea value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Why are you taking leave?" />
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
