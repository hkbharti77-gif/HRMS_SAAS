'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';

const exportOptions = [
  { id: 'ex1', name: 'Employee Directory', description: 'All employees with contact and employment details', icon: 'Users', records: 342 },
  { id: 'ex2', name: 'Payroll Records', description: 'Payroll runs, payslips, and tax filings', icon: 'Banknote', records: 4104 },
  { id: 'ex3', name: 'Attendance Log', description: 'Punch in/out records for all employees', icon: 'CalendarCheck', records: 7350 },
  { id: 'ex4', name: 'Leave History', description: 'All leave requests and approvals', icon: 'CalendarOff', records: 1856 },
  { id: 'ex5', name: 'Asset Register', description: 'Complete asset inventory with assignments', icon: 'Laptop', records: 387 },
  { id: 'ex6', name: 'Expense Claims', description: 'All expense claims and reimbursements', icon: 'Wallet', records: 924 },
];

export default function DataExportPage() {
  return (
    <div>
      <PageHeader
        title="Data Export"
        description="Download company data in CSV or Excel format."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Settings' }, { label: 'Export' }]}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {exportOptions.map((e) => (
          <Card key={e.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                  <Icon name={e.icon} className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{e.name}</p>
                  <p className="text-xs text-muted-foreground">{e.description}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{e.records.toLocaleString()} records</p>
                </div>
              </div>
              <Button variant="outline" size="sm"><Icon name="Download" className="mr-1.5 h-3.5 w-3.5" />Export</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
