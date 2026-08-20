'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent } from '@/components/ui/card';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { leaveRequests, expenseClaims, assetRequests } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';

type LeaveReq = (typeof leaveRequests)[number];
type ExpenseClaim = (typeof expenseClaims)[number];
type AssetReq = (typeof assetRequests)[number];

export default function ManagerApprovalsPage() {
  const { toast } = useToast();
  const [tab, setTab] = React.useState<'leave' | 'expense' | 'asset'>('leave');
  const [leaves, setLeaves] = React.useState<LeaveReq[]>(leaveRequests);
  const [expenses, setExpenses] = React.useState<ExpenseClaim[]>(expenseClaims);
  const [assets, setAssets] = React.useState<AssetReq[]>(assetRequests);

  const pendingLeave = leaves.filter((l) => l.status === 'Pending');
  const pendingExpense = expenses.filter((e) => e.status === 'Pending');
  const pendingAsset = assets.filter((a) => a.status === 'Pending');

  const handleLeaveAction = (id: string, action: 'Approved' | 'Rejected') => {
    setLeaves((prev) => prev.map((l) => l.id === id ? { ...l, status: action, approver: 'Sarah Chen' } : l));
    toast({ title: `Leave ${action.toLowerCase()}`, description: action === 'Approved' ? 'The employee has been notified.' : 'The employee has been notified of the rejection.' });
  };
  const handleExpenseAction = (id: string, action: 'Approved' | 'Rejected') => {
    setExpenses((prev) => prev.map((e) => e.id === id ? { ...e, status: action } : e));
    toast({ title: `Expense ${action.toLowerCase()}`, description: action === 'Approved' ? 'The claim will be processed in the next payroll cycle.' : 'The employee has been notified of the rejection.' });
  };
  const handleAssetAction = (id: string, action: 'Approved' | 'Rejected') => {
    setAssets((prev) => prev.map((a) => a.id === id ? { ...a, status: action } : a));
    toast({ title: `Asset request ${action.toLowerCase()}`, description: action === 'Approved' ? 'The IT team will process the asset assignment.' : 'The employee has been notified of the rejection.' });
  };

  const tabs = [
    { key: 'leave' as const, label: 'Leave', count: pendingLeave.length },
    { key: 'expense' as const, label: 'Expenses', count: pendingExpense.length },
    { key: 'asset' as const, label: 'Assets', count: pendingAsset.length },
  ];

  return (
    <div>
      <PageHeader title="Approvals" description="Review and approve leave, expense, and asset requests from your team." breadcrumbs={[{ label: 'Manager', href: '/manager/dashboard' }, { label: 'Approvals' }]} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Leave requests" value={pendingLeave.length} icon="CalendarOff" tone="warning" footer="pending" />
        <StatCard label="Expense claims" value={pendingExpense.length} icon="Wallet" tone="info" footer="pending" />
        <StatCard label="Asset requests" value={pendingAsset.length} icon="Laptop" tone="brand" footer="pending" />
      </div>

      <div className="mb-4 flex gap-1 rounded-lg bg-muted p-1">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${tab === t.key ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
            {t.label}
            <span className={`rounded-full px-1.5 py-0.5 text-xs ${tab === t.key ? 'bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300' : 'bg-muted-foreground/20'}`}>{t.count}</span>
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          {tab === 'leave' && (
            <div className="divide-y">
              {pendingLeave.map((l) => (
                <ApprovalRow key={l.id} name={l.employeeName} subtitle={`${l.type} · ${l.days} day${l.days > 1 ? 's' : ''} · ${formatDate(l.from, 'short')} – ${formatDate(l.to, 'short')}`} detail={l.reason} status={l.status} onApprove={() => handleLeaveAction(l.id, 'Approved')} onReject={() => handleLeaveAction(l.id, 'Rejected')} />
              ))}
              {pendingLeave.length === 0 && <EmptyApproval label="No pending leave requests" />}
            </div>
          )}
          {tab === 'expense' && (
            <div className="divide-y">
              {pendingExpense.map((e) => (
                <ApprovalRow key={e.id} name={e.employeeName} subtitle={`${e.category} · ${formatDate(e.date, 'short')}`} detail={e.description} status={e.status} amount={`$${e.amount.toLocaleString()}`} onApprove={() => handleExpenseAction(e.id, 'Approved')} onReject={() => handleExpenseAction(e.id, 'Rejected')} />
              ))}
              {pendingExpense.length === 0 && <EmptyApproval label="No pending expense claims" />}
            </div>
          )}
          {tab === 'asset' && (
            <div className="divide-y">
              {pendingAsset.map((a) => (
                <ApprovalRow key={a.id} name={a.employeeName} subtitle={`${a.item} · ${formatDate(a.date, 'short')}`} detail={a.reason} status={a.status} onApprove={() => handleAssetAction(a.id, 'Approved')} onReject={() => handleAssetAction(a.id, 'Rejected')} />
              ))}
              {pendingAsset.length === 0 && <EmptyApproval label="No pending asset requests" />}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ApprovalRow({ name, subtitle, detail, status, amount, onApprove, onReject }: { name: string; subtitle: string; detail: string; status: string; amount?: string; onApprove: () => void; onReject: () => void }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <AvatarBadge name={name} size="sm" />
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
          {detail && <p className="mt-0.5 text-xs text-muted-foreground italic">"{detail}"</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {amount && <span className="text-sm font-semibold">{amount}</span>}
        <div className="flex gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8 text-success-600 hover:bg-success-50 dark:hover:bg-success-500/10" onClick={onApprove}><Icon name="Check" className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon" className="h-8 w-8 text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-500/10" onClick={onReject}><Icon name="X" className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
}

function EmptyApproval({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon name="CircleCheck" className="mb-3 h-10 w-10 text-success-500" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
