'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { FormDrawer } from '@/components/shared/form-drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { trainingAssignments } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

export default function AssignTrainingPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <PageHeader
        title="Assign Training"
        description="Assign mandatory and optional training courses to employees."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Learning' }, { label: 'Assign' }]}
        action={{ label: 'Assign course', icon: 'Plus', onClick: () => setOpen(true) }}
      />
      <div className="space-y-4">
        {trainingAssignments.map((t) => (
          <Card key={t.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <p className="font-semibold">{t.course}</p>
                  <p className="text-xs text-muted-foreground">Assigned to: {t.assignedTo} · By {t.assignedBy} · Due {formatDate(t.dueDate, 'short')}</p>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{t.completed}/{t.total} completed</span>
                      <span className="font-medium">{t.progress}%</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                      <div className={`h-full rounded-full ${t.progress >= 80 ? 'bg-success-500' : t.progress >= 50 ? 'bg-brand-500' : 'bg-warning-500'}`} style={{ width: `${t.progress}%` }} />
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm"><Icon name="Bell" className="mr-1.5 h-3.5 w-3.5" />Remind</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <FormDrawer
        open={open}
        onOpenChange={setOpen}
        title="Assign Training"
        description="Assign a course to employees."
        onSubmit={() => setOpen(false)}
        submitLabel="Assign"
      >
        <div className="space-y-2"><Label>Course</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>Workplace Harassment Prevention</option><option>Data Privacy & Security</option><option>Leadership Essentials</option><option>Advanced Excel</option></select></div>
        <div className="space-y-2"><Label>Assign to</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>All Employees</option><option>Specific Department</option><option>Specific Employees</option><option>Managers Only</option></select></div>
        <div className="space-y-2"><Label>Due date</Label><Input type="date" /></div>
      </FormDrawer>
    </div>
  );
}
