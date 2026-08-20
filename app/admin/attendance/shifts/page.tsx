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
import { shifts } from '@/lib/mock-data';

export default function ShiftsPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <PageHeader
        title="Shifts"
        description="Define work shifts with timings, grace periods, and assignments."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Attendance' }, { label: 'Shifts' }]}
        action={{ label: 'Add shift', icon: 'Plus', onClick: () => setOpen(true) }}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shifts.map((s) => (
          <Card key={s.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ background: s.color }}>
                    <Icon name="Clock" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.employees} employees</p>
                  </div>
                </div>
                {s.weekendOff && <Badge variant="secondary">Weekends off</Badge>}
              </div>
              <div className="mt-4 space-y-2 border-t pt-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timing</span>
                  <span className="font-medium">{s.startTime} – {s.endTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Grace period</span>
                  <span className="font-medium">{s.gracePeriod > 0 ? `${s.gracePeriod} min` : 'None'}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1"><Icon name="Edit3" className="mr-1.5 h-3.5 w-3.5" />Edit</Button>
                <Button variant="outline" size="sm" className="flex-1"><Icon name="Users" className="mr-1.5 h-3.5 w-3.5" />Assign</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <FormDrawer
        open={open}
        onOpenChange={setOpen}
        title="Add Shift"
        description="Create a new work shift."
        onSubmit={() => setOpen(false)}
        submitLabel="Create"
      >
        <div className="space-y-2"><Label>Shift name</Label><Input placeholder="e.g. Early Morning" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Start time</Label><Input type="time" /></div>
          <div className="space-y-2"><Label>End time</Label><Input type="time" /></div>
        </div>
        <div className="space-y-2"><Label>Grace period (minutes)</Label><Input type="number" defaultValue={15} /></div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="h-4 w-4 rounded" /><span>Weekends off</span></label>
      </FormDrawer>
    </div>
  );
}
