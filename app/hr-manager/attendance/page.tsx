'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { MultiBarTrend } from '@/components/shared/charts';
import { attendance, regularizations, overtimeRecords } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';

const weeklyAttendance = [
  { day: 'Mon', present: 312, absent: 18, wfh: 12 },
  { day: 'Tue', present: 318, absent: 14, wfh: 10 },
  { day: 'Wed', present: 305, absent: 22, wfh: 15 },
  { day: 'Thu', present: 320, absent: 12, wfh: 10 },
  { day: 'Fri', present: 298, absent: 20, wfh: 24 },
];

type Reg = (typeof regularizations)[number];

export default function HrManagerAttendancePage() {
  const { toast } = useToast();
  const [regs, setRegs] = React.useState<Reg[]>(regularizations);

  const handleRegAction = (id: string, action: 'Approved' | 'Rejected') => {
    setRegs((prev) => prev.map((r) => r.id === id ? { ...r, status: action, approver: 'HR Manager' } : r));
    toast({ title: `Regularization ${action.toLowerCase()}`, description: action === 'Approved' ? 'The attendance record has been corrected.' : 'The employee has been notified.' });
  };

  const pendingRegs = regs.filter((r) => r.status === 'Pending');

  const columns: Column<Reg>[] = [
    { key: 'employeeName', header: 'Employee', cell: (r) => (<div className="flex items-center gap-2"><AvatarBadge name={r.employeeName} size="sm" /><span className="font-medium">{r.employeeName}</span></div>) },
    { key: 'type', header: 'Type', sortable: true, sortValue: (r) => r.type, cell: (r) => <span className="text-sm">{r.type}</span> },
    { key: 'date', header: 'Date', sortable: true, sortValue: (r) => r.date, cell: (r) => <span className="text-muted-foreground">{formatDate(r.date, 'short')}</span> },
    { key: 'reason', header: 'Reason', cell: (r) => <span className="text-muted-foreground line-clamp-1">{r.reason}</span>, hideOnMobile: true },
    { key: 'status', header: 'Status', sortable: true, sortValue: (r) => r.status, cell: (r) => <StatusBadge status={r.status} dot /> },
    { key: 'actions', header: '', cell: (r) => r.status === 'Pending' ? (<div className="flex gap-1"><Button variant="outline" size="icon" className="h-8 w-8 text-success-600 hover:bg-success-50 dark:hover:bg-success-500/10" onClick={() => handleRegAction(r.id, 'Approved')}><Icon name="Check" className="h-4 w-4" /></Button><Button variant="outline" size="icon" className="h-8 w-8 text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-500/10" onClick={() => handleRegAction(r.id, 'Rejected')}><Icon name="X" className="h-4 w-4" /></Button></div>) : null },
  ];

  return (
    <div>
      <PageHeader title="Attendance" description="Monitor attendance patterns, regularizations, and overtime." breadcrumbs={[{ label: 'HR Manager', href: '/hr-manager/dashboard' }, { label: 'Attendance' }]} />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Present today" value={320} icon="CircleCheck" tone="success" />
        <StatCard label="Absent" value={18} icon="CircleX" tone="danger" />
        <StatCard label="WFH" value={22} icon="Building" tone="info" />
        <StatCard label="Pending regularizations" value={pendingRegs.length} icon="RefreshCw" tone="warning" />
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-4"><CardTitle className="text-base">Weekly Attendance Breakdown</CardTitle></CardHeader>
        <CardContent><MultiBarTrend data={weeklyAttendance} xKey="day" series={[{ key: 'present', name: 'Present', color: '#22c55e' }, { key: 'wfh', name: 'WFH', color: '#3b82f6' }, { key: 'absent', name: 'Absent', color: '#ef4444' }]} stacked /></CardContent>
      </Card>

      <DataTable columns={columns} data={regs} searchKeys={['employeeName', 'type', 'reason', 'status']} searchPlaceholder="Search regularizations..." initialSort={{ key: 'date', dir: 'desc' }} />
    </div>
  );
}
