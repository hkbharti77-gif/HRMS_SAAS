'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { FormDrawer } from '@/components/shared/form-drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { salaryStructures } from '@/lib/mock-data';

export default function SalaryStructuresPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <PageHeader
        title="Salary Structures"
        description="Define earning and deduction components for different employee categories."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Payroll' }, { label: 'Structures' }]}
        action={{ label: 'Add structure', icon: 'Plus', onClick: () => setOpen(true) }}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {salaryStructures.map((s) => (
          <Card key={s.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.employees} employees assigned</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Edit3" className="h-4 w-4" /></Button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 border-t pt-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Basic</span><span className="font-medium">{s.basic}%</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">HRA</span><span className="font-medium">{s.hra}%</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Allowances</span><span className="font-medium">{s.allowances}%</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Special</span><span className="font-medium">{s.special}%</span></div>
                <div className="flex justify-between border-t pt-2"><span className="text-muted-foreground">PF deduction</span><span className="font-medium text-danger-600">{s.deductionPF}%</span></div>
                <div className="flex justify-between border-t pt-2"><span className="text-muted-foreground">Tax</span><span className="font-medium text-danger-600">{s.deductionTax}</span></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <FormDrawer
        open={open}
        onOpenChange={setOpen}
        title="Add Salary Structure"
        description="Create a new salary structure template."
        onSubmit={() => setOpen(false)}
        submitLabel="Create"
      >
        <div className="space-y-2"><Label>Structure name</Label><Input placeholder="e.g. Senior Staff" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Basic (%)</Label><Input type="number" defaultValue={40} /></div>
          <div className="space-y-2"><Label>HRA (%)</Label><Input type="number" defaultValue={20} /></div>
          <div className="space-y-2"><Label>Allowances (%)</Label><Input type="number" defaultValue={25} /></div>
          <div className="space-y-2"><Label>Special (%)</Label><Input type="number" defaultValue={15} /></div>
        </div>
        <div className="space-y-2"><Label>PF deduction (%)</Label><Input type="number" defaultValue={12} /></div>
      </FormDrawer>
    </div>
  );
}
