'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { reportBuilderModules } from '@/lib/mock-data';

export default function ReportBuilderPage() {
  return (
    <div>
      <PageHeader
        title="Report Builder"
        description="Build custom reports by selecting modules and fields."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Reports' }]}
        action={{ label: 'Save report', icon: 'Save' }}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-4"><CardTitle className="text-base">Select Module</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {reportBuilderModules.map((m) => (
              <button key={m.id} className="flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                    <Icon name={m.icon} className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.fields} fields</p>
                  </div>
                </div>
                <Icon name="ChevronRight" className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-4"><CardTitle className="text-base">Configure Report</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium">Report name</p>
              <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" placeholder="e.g. Monthly Headcount Report" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-2 text-sm font-medium">Format</p>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>PDF</option><option>Excel</option><option>CSV</option></select>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Schedule</p>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>One-time</option><option>Weekly</option><option>Monthly</option><option>Quarterly</option></select>
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">Selected fields</p>
              <div className="flex flex-wrap gap-2">
                {['Employee Name', 'Department', 'Join Date', 'Status', 'Salary'].map((f) => (
                  <span key={f} className="flex items-center gap-1 rounded-md border bg-muted/50 px-2 py-1 text-xs">
                    {f}
                    <button className="text-muted-foreground hover:text-foreground"><Icon name="X" className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button><Icon name="Download" className="mr-2 h-4 w-4" />Generate</Button>
              <Button variant="outline">Preview</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
