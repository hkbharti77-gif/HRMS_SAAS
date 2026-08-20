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
import { employees, departments, probationEmployees, offboardingEmployees, employeeLifecycle } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import type { Employee } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function HrManagerPeoplePage() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [people, setPeople] = React.useState<Employee[]>(employees);
  const [tab, setTab] = React.useState<'directory' | 'probation' | 'offboarding' | 'lifecycle'>('directory');
  const [form, setForm] = React.useState({ firstName: '', lastName: '', email: '', designation: '', department: 'Engineering', location: 'San Francisco', employmentType: 'Full-time' });

  const handleSubmit = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.designation) {
      toast({ title: 'Please fill all fields', description: 'Name, email, and designation are required.', variant: 'destructive' });
      return;
    }
    const newEmp: Employee = {
      id: `e${Date.now()}`,
      empCode: `EMP${1000 + people.length}`,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: '',
      department: form.department,
      designation: form.designation,
      location: form.location,
      employmentType: form.employmentType as Employee['employmentType'],
      joinDate: new Date().toISOString().slice(0, 10),
      status: 'active',
      skills: [],
      leaveBalance: { casual: 12, sick: 12, earned: 24 },
      gender: 'Other',
      salary: 0,
    };
    setPeople((prev) => [newEmp, ...prev]);
    setForm({ firstName: '', lastName: '', email: '', designation: '', department: 'Engineering', location: 'San Francisco', employmentType: 'Full-time' });
    setOpen(false);
    toast({ title: 'Employee added', description: `${form.firstName} ${form.lastName} has been onboarded to ${form.department}.` });
  };

  const columns: Column<Employee>[] = [
    { key: 'name', header: 'Name', sortable: true, sortValue: (r) => `${r.firstName} ${r.lastName}`, cell: (r) => (<div className="flex items-center gap-2"><AvatarBadge name={`${r.firstName} ${r.lastName}`} size="sm" /><div><p className="text-sm font-medium">{r.firstName} {r.lastName}</p><p className="text-xs text-muted-foreground">{r.empCode}</p></div></div>) },
    { key: 'designation', header: 'Designation', sortable: true, sortValue: (r) => r.designation, cell: (r) => <span className="text-sm">{r.designation}</span> },
    { key: 'department', header: 'Department', sortable: true, sortValue: (r) => r.department, cell: (r) => <span className="text-muted-foreground text-sm">{r.department}</span>, hideOnMobile: true },
    { key: 'status', header: 'Status', sortable: true, sortValue: (r) => r.status, cell: (r) => <StatusBadge status={r.status} dot /> },
    { key: 'actions', header: '', cell: () => (<Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Eye" className="h-4 w-4" /></Button>) },
  ];

  const tabs = [
    { key: 'directory' as const, label: 'Directory', count: people.length },
    { key: 'probation' as const, label: 'Probation', count: probationEmployees.length },
    { key: 'offboarding' as const, label: 'Offboarding', count: offboardingEmployees.length },
    { key: 'lifecycle' as const, label: 'Lifecycle', count: employeeLifecycle.length },
  ];

  return (
    <div>
      <PageHeader title="People Management" description="Manage employees, probation, offboarding, and lifecycle events." breadcrumbs={[{ label: 'HR Manager', href: '/hr-manager/dashboard' }, { label: 'People' }]} action={{ label: 'Add Employee', icon: 'UserPlus', onClick: () => setOpen(true) }} />

      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <StatCard label="Total employees" value={people.length} icon="Users" tone="brand" />
        <StatCard label="On probation" value={probationEmployees.length} icon="Hourglass" tone="warning" />
        <StatCard label="Offboarding" value={offboardingEmployees.filter((o) => o.status !== 'Completed').length} icon="LogOut" tone="danger" />
        <StatCard label="New this month" value={3} icon="UserPlus" tone="success" />
      </div>

      <div className="mb-4 flex gap-1 rounded-lg bg-muted p-1">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${tab === t.key ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
            {t.label}<span className={`rounded-full px-1.5 py-0.5 text-xs ${tab === t.key ? 'bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300' : 'bg-muted-foreground/20'}`}>{t.count}</span>
          </button>
        ))}
      </div>

      {tab === 'directory' && <DataTable columns={columns} data={people} searchKeys={['firstName', 'lastName', 'designation', 'department', 'empCode']} searchPlaceholder="Search employees..." />}

      {tab === 'probation' && (
        <div className="space-y-3">
          {probationEmployees.map((p) => (
            <Card key={p.id} className="border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3"><AvatarBadge name={p.employeeName} size="sm" /><div><p className="text-sm font-medium">{p.employeeName}</p><p className="text-xs text-muted-foreground">{p.designation} · {p.department}</p></div></div>
                <div className="flex items-center gap-3"><span className="text-xs text-muted-foreground">{p.daysLeft > 0 ? `${p.daysLeft} days left` : 'Overdue'}</span><StatusBadge status={p.status} dot /><Button variant="outline" size="sm" className="h-7 text-xs">Review</Button></div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'offboarding' && (
        <div className="space-y-3">
          {offboardingEmployees.map((o) => (
            <Card key={o.id} className="border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3"><AvatarBadge name={o.employeeName} size="sm" /><div><p className="text-sm font-medium">{o.employeeName}</p><p className="text-xs text-muted-foreground">{o.designation} · Last day {formatDate(o.lastDay, 'short')}</p></div></div>
                <div className="flex items-center gap-3"><div className="text-right"><p className="text-xs text-muted-foreground">Tasks</p><p className="text-sm font-medium">{o.tasksCompleted}/{o.tasksTotal}</p></div><StatusBadge status={o.status} dot /></div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'lifecycle' && (
        <div className="space-y-3">
          {employeeLifecycle.map((l) => (
            <Card key={l.id} className="border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${l.event === 'Onboarded' ? 'bg-success-50 text-success-600 dark:bg-success-500/10' : l.event === 'Exited' ? 'bg-danger-50 text-danger-600 dark:bg-danger-500/10' : 'bg-brand-50 text-brand-600 dark:bg-brand-500/10'}`}><Icon name={l.event === 'Onboarded' ? 'UserPlus' : l.event === 'Exited' ? 'LogOut' : 'Activity'} className="h-4 w-4" /></div>
                <div className="flex-1"><p className="text-sm font-medium">{l.employeeName} — {l.event}</p><p className="text-xs text-muted-foreground">{l.details} · {formatDate(l.date, 'short')}</p></div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <FormDrawer open={open} onOpenChange={setOpen} title="Add Employee" description="Onboard a new team member." onSubmit={handleSubmit} submitLabel="Add">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>First Name</Label><Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="John" /></div>
          <div className="space-y-2"><Label>Last Name</Label><Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Doe" /></div>
        </div>
        <div className="space-y-2"><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@company.com" /></div>
        <div className="space-y-2"><Label>Designation</Label><Input value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} placeholder="Software Engineer" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Department</Label><select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">{departments.map((d) => <option key={d.id}>{d.name}</option>)}</select></div>
          <div className="space-y-2"><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="San Francisco" /></div>
        </div>
      </FormDrawer>
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border bg-card ${className ?? ''}`}>{children}</div>;
}
