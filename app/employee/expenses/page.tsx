'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { myExpenses } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';

type Expense = (typeof myExpenses)[number];

export default function EmployeeExpensesPage() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [expenses, setExpenses] = React.useState<Expense[]>(myExpenses);
  const [form, setForm] = React.useState({ category: 'Travel', amount: '', date: '', description: '' });

  const handleSubmit = () => {
    const amt = parseFloat(form.amount);
    if (!amt || amt <= 0 || !form.date || !form.description) {
      toast({ title: 'Please fill all fields', description: 'Amount, date, and description are required.', variant: 'destructive' });
      return;
    }
    const newExp: Expense = {
      id: `mex${Date.now()}`,
      category: form.category,
      amount: amt,
      date: form.date,
      status: 'Pending',
      description: form.description,
    };
    setExpenses((prev) => [newExp, ...prev]);
    setForm({ category: 'Travel', amount: '', date: '', description: '' });
    setOpen(false);
    toast({ title: 'Expense submitted', description: `${form.category} expense of ${formatCurrency(amt)} is pending approval.` });
  };

  const pending = expenses.filter((e) => e.status === 'Pending').length;
  const approved = expenses.filter((e) => e.status === 'Approved' || e.status === 'Reimbursed').length;
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const columns: Column<Expense>[] = [
    { key: 'category', header: 'Category', sortable: true, sortValue: (r) => r.category, cell: (r) => <span className="font-medium">{r.category}</span> },
    { key: 'amount', header: 'Amount', sortable: true, sortValue: (r) => r.amount, cell: (r) => <span className="font-semibold">{formatCurrency(r.amount)}</span> },
    { key: 'date', header: 'Date', sortable: true, sortValue: (r) => r.date, cell: (r) => <span className="text-muted-foreground">{formatDate(r.date, 'short')}</span>, hideOnMobile: true },
    { key: 'description', header: 'Description', cell: (r) => <span className="text-muted-foreground line-clamp-1">{r.description}</span>, hideOnMobile: true },
    { key: 'status', header: 'Status', sortable: true, sortValue: (r) => r.status, cell: (r) => <StatusBadge status={r.status} dot /> },
  ];

  return (
    <div>
      <PageHeader title="My Expenses" description="Submit expense claims and track their approval status." breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Expenses' }]} action={{ label: 'New expense', icon: 'Plus', onClick: () => setOpen(true) }} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Pending" value={pending} icon="Clock3" tone="warning" footer="claims" />
        <StatCard label="Approved" value={approved} icon="CircleCheck" tone="success" footer="claims" />
        <StatCard label="Total" value={formatCurrency(total, 'USD', true)} icon="Wallet" tone="brand" />
      </div>
      <DataTable columns={columns} data={expenses} searchKeys={['category', 'description', 'status']} searchPlaceholder="Search expenses..." initialSort={{ key: 'date', dir: 'desc' }} />

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-elevated" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">New Expense</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(false)}><Icon name="X" className="h-4 w-4" /></Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option>Travel</option><option>Meals</option><option>Software</option><option>Office Supplies</option><option>Training</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Amount</label>
                <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0.00" className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Date</label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="What was this expense for?" />
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
