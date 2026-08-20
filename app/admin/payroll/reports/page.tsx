'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { BarTrend } from '@/components/shared/charts';
import { formatCurrency } from '@/lib/format';

const reportCategories = [
  { id: 'rc1', name: 'Payroll Summary', description: 'Monthly gross, deductions, and net payout', icon: 'BarChart3', runs: 12 },
  { id: 'rc2', name: 'Tax Liability', description: 'Tax withheld by jurisdiction and period', icon: 'FileSpreadsheet', runs: 4 },
  { id: 'rc3', name: 'Department Cost', description: 'Salary cost breakdown by department', icon: 'Building', runs: 6 },
  { id: 'rc4', name: 'Headcount Cost', description: 'Average cost per employee trends', icon: 'Users', runs: 8 },
  { id: 'rc5', name: 'Statutory Filing', description: 'Compliance filing status and due dates', icon: 'Landmark', runs: 5 },
  { id: 'rc6', name: 'Reimbursement Report', description: 'All reimbursements by category and employee', icon: 'Receipt', runs: 3 },
];

const costByDept = [
  { dept: 'Engineering', value: 720000 },
  { dept: 'Sales', value: 340000 },
  { dept: 'Operations', value: 280000 },
  { dept: 'Finance', value: 195000 },
  { dept: 'HR', value: 180000 },
  { dept: 'Design', value: 120000 },
];

export default function PayrollReportsPage() {
  return (
    <div>
      <PageHeader
        title="Payroll Reports"
        description="Generate, schedule, and download payroll reports."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Payroll' }, { label: 'Reports' }]}
        action={{ label: 'Create report', icon: 'Plus' }}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4"><CardTitle className="text-base">Salary Cost by Department</CardTitle></CardHeader>
          <CardContent>
            <BarTrend data={costByDept} xKey="dept" yKey="value" color="#2563eb" formatter={(v) => formatCurrency(Number(v), 'USD', true)} />
          </CardContent>
        </Card>
        {reportCategories.map((r) => (
          <Card key={r.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                  <Icon name={r.icon} className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{r.runs} runs</span>
                <Button variant="outline" size="sm"><Icon name="Download" className="mr-1.5 h-3.5 w-3.5" />Run</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
