'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/shared/icon';
import { FormDrawer } from '@/components/shared/form-drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { leavePolicies } from '@/lib/mock-data';

export default function LeavePolicyPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <PageHeader
        title="Leave Policy"
        description="Configure leave types, allocations, carry-forward rules, and encashment."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Leave' }, { label: 'Policy' }]}
        action={{ label: 'Add leave type', icon: 'Plus', onClick: () => setOpen(true) }}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {leavePolicies.map((p) => (
          <Card key={p.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ background: p.color }}>
                    <Icon name="CalendarOff" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{p.type}</p>
                    <p className="text-xs text-muted-foreground">{p.allocation > 0 ? `${p.allocation} days/year` : 'Unlimited basis'}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {p.encashable && <Badge variant="secondary">Encashable</Badge>}
                  {p.carryForward > 0 && <Badge variant="secondary">CF: {p.carryForward}d</Badge>}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Notice period</p>
                  <p className="font-medium">{p.noticePeriod}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Carry forward</p>
                  <p className="font-medium">{p.carryForward > 0 ? `${p.carryForward} days` : 'Not allowed'}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="ghost" size="sm"><Icon name="Edit3" className="mr-1.5 h-3.5 w-3.5" />Edit policy</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <FormDrawer
        open={open}
        onOpenChange={setOpen}
        title="Add Leave Type"
        description="Define a new leave category."
        onSubmit={() => setOpen(false)}
        submitLabel="Create"
      >
        <div className="space-y-2"><Label>Leave type name</Label><Input placeholder="e.g. Bereavement Leave" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Annual allocation (days)</Label><Input type="number" placeholder="3" /></div>
          <div className="space-y-2"><Label>Carry forward (days)</Label><Input type="number" placeholder="0" /></div>
        </div>
        <div className="space-y-2"><Label>Notice period</Label><Input placeholder="e.g. 1 day" /></div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-4 w-4 rounded" /><span>Encashable on exit</span></label>
      </FormDrawer>
    </div>
  );
}
