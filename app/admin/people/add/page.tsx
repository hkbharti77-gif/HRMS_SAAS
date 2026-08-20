'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icon } from '@/components/shared/icon';

export default function AddEmployeePage() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);

  return (
    <div>
      <PageHeader
        title="Add Employee"
        description="Onboard a new team member in a few quick steps."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'People', href: '/admin/people' }, { label: 'Add' }]}
      />

      <div className="mb-6 flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
              step >= s ? 'bg-brand-600 text-white' : 'bg-muted text-muted-foreground'
            }`}>{s}</div>
            {s < 3 && <div className={`h-0.5 w-12 ${step > s ? 'bg-brand-600' : 'bg-muted'}`} />}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <Card className="max-w-2xl">
          <CardHeader><CardTitle className="text-base">Personal Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>First name</Label><Input placeholder="John" /></div>
              <div className="space-y-2"><Label>Last name</Label><Input placeholder="Doe" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="john@company.com" /></div>
              <div className="space-y-2"><Label>Phone</Label><Input placeholder="+1 555 0000" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Date of birth</Label><Input type="date" /></div>
              <div className="space-y-2"><Label>Gender</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>Male</option><option>Female</option><option>Other</option></select></div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => router.push('/admin/people')}>Cancel</Button>
              <Button onClick={() => setStep(2)}>Next <Icon name="ArrowRight" className="ml-2 h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="max-w-2xl">
          <CardHeader><CardTitle className="text-base">Employment Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Employee code</Label><Input placeholder="EMP-001" /></div>
              <div className="space-y-2"><Label>Designation</Label><Input placeholder="Software Engineer" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Department</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>Engineering</option><option>Sales</option><option>HR</option><option>Finance</option><option>Operations</option></select></div>
              <div className="space-y-2"><Label>Location</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>San Francisco HQ</option><option>London Office</option><option>Tokyo Office</option><option>Berlin Office</option><option>Remote</option></select></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Employment type</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Intern</option></select></div>
              <div className="space-y-2"><Label>Join date</Label><Input type="date" /></div>
            </div>
            <div className="space-y-2"><Label>Manager</Label><Input placeholder="Search employee..." /></div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)}>Next <Icon name="ArrowRight" className="ml-2 h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card className="max-w-2xl">
          <CardHeader><CardTitle className="text-base">Compensation & Review</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Annual salary (USD)</Label><Input type="number" placeholder="75000" /></div>
              <div className="space-y-2"><Label>Pay frequency</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>Monthly</option><option>Bi-weekly</option><option>Semi-monthly</option></select></div>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="mb-3 text-sm font-medium">Review summary</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">John Doe</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="font-medium">john@company.com</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Designation</span><span className="font-medium">Software Engineer</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Department</span><span className="font-medium">Engineering</span></div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={() => router.push('/admin/people')}>
                <Icon name="Check" className="mr-2 h-4 w-4" />Create employee
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
