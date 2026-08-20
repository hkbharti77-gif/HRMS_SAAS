'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/shared/icon';
import { employees, payrollRuns } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/format';

const steps = ['Review Data', 'Calculate', 'Approve', 'Disburse'];

export default function RunPayrollPage() {
  const [step, setStep] = React.useState(0);
  const draftRun = payrollRuns.find((r) => r.status === 'Draft');
  const estGross = 2102000;
  const estDeductions = 462440;
  const estNet = estGross - estDeductions;

  return (
    <div>
      <PageHeader
        title="Run Payroll"
        description="Process monthly payroll in four guided steps."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Payroll' }, { label: 'Run' }]}
      />

      <div className="mb-6 flex items-center gap-2">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step >= i ? 'bg-brand-600 text-white' : 'bg-muted text-muted-foreground'}`}>
              {step > i ? <Icon name="Check" className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-sm ${step >= i ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>{s}</span>
            {i < steps.length - 1 && <div className={`h-0.5 flex-1 ${step > i ? 'bg-brand-600' : 'bg-muted'}`} />}
          </React.Fragment>
        ))}
      </div>

      {step === 0 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Step 1 — Review Employee Data</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-info-50 p-4 text-sm text-info-700 dark:bg-info-500/10 dark:text-info-300">
              <p className="flex items-center gap-2"><Icon name="Info" className="h-4 w-4" />Payroll period: <strong>{draftRun?.month}</strong> · {employees.length} employees</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border p-4"><p className="text-xs text-muted-foreground">New joiners</p><p className="mt-1 text-lg font-semibold">2</p></div>
              <div className="rounded-lg border p-4"><p className="text-xs text-muted-foreground">Exits this month</p><p className="mt-1 text-lg font-semibold">1</p></div>
              <div className="rounded-lg border p-4"><p className="text-xs text-muted-foreground">Salary changes</p><p className="mt-1 text-lg font-semibold">3</p></div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button onClick={() => setStep(1)}>Continue <Icon name="ArrowRight" className="ml-2 h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 1 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Step 2 — Calculate Payroll</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border p-4"><p className="text-xs text-muted-foreground">Gross salary</p><p className="mt-1 text-xl font-bold">{formatCurrency(estGross, 'USD', true)}</p></div>
              <div className="rounded-lg border p-4"><p className="text-xs text-muted-foreground">Deductions</p><p className="mt-1 text-xl font-bold text-danger-600">{formatCurrency(estDeductions, 'USD', true)}</p></div>
              <div className="rounded-lg border border-brand-200 bg-brand-50 p-4 dark:border-brand-800 dark:bg-brand-500/10"><p className="text-xs text-muted-foreground">Net payable</p><p className="mt-1 text-xl font-bold text-brand-600">{formatCurrency(estNet, 'USD', true)}</p></div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
              <Button onClick={() => setStep(2)}>Continue <Icon name="ArrowRight" className="ml-2 h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Step 3 — Review & Approve</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <p className="mb-3 text-sm font-medium">Summary</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Pay period</span><span className="font-medium">{draftRun?.month}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Employees</span><span className="font-medium">{employees.length}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Gross</span><span className="font-medium">{formatCurrency(estGross, 'USD', true)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Deductions</span><span className="font-medium">{formatCurrency(estDeductions, 'USD', true)}</span></div>
                <div className="flex justify-between border-t pt-2"><span className="text-muted-foreground">Net payable</span><span className="font-bold text-brand-600">{formatCurrency(estNet, 'USD', true)}</span></div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)}><Icon name="Check" className="mr-2 h-4 w-4" />Approve payroll</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Step 4 — Disburse</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-50 text-success-600 dark:bg-success-500/10">
                <Icon name="CircleCheck" className="h-8 w-8" />
              </div>
              <p className="mt-4 text-lg font-semibold">Payroll approved!</p>
              <p className="text-sm text-muted-foreground">{formatCurrency(estNet, 'USD', true)} will be disbursed to {employees.length} employees.</p>
              <div className="mt-6 flex gap-3">
                <Button variant="outline"><Icon name="Download" className="mr-2 h-4 w-4" />Download report</Button>
                <Button><Icon name="Send" className="mr-2 h-4 w-4" />Disburse now</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
