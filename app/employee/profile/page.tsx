'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { employees } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

export default function EmployeeProfilePage() {
  const me = employees[0];

  const personalInfo = [
    { label: 'Employee Code', value: me.empCode },
    { label: 'Date of Birth', value: me.dob ? formatDate(me.dob, 'medium') : '—' },
    { label: 'Gender', value: me.gender },
    { label: 'Phone', value: me.phone },
    { label: 'Email', value: me.email },
  ];

  const workInfo = [
    { label: 'Department', value: me.department },
    { label: 'Designation', value: me.designation },
    { label: 'Employment Type', value: me.employmentType },
    { label: 'Location', value: me.location },
    { label: 'Manager', value: me.manager ?? '—' },
    { label: 'Join Date', value: formatDate(me.joinDate, 'medium') },
  ];

  return (
    <div>
      <PageHeader
        title="My Profile"
        description="Your personal and employment information."
        breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Profile' }]}
        action={{ label: 'Edit profile', icon: 'Edit3' }}
      />

      <Card className="mb-6">
        <CardContent className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:items-start">
          <AvatarBadge name={`${me.firstName} ${me.lastName}`} size="lg" className="h-20 w-20 text-2xl" />
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-semibold">{me.firstName} {me.lastName}</h2>
            <p className="text-sm text-muted-foreground">{me.designation} · {me.department}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
              <Badge variant="secondary">{me.employmentType}</Badge>
              <Badge variant="secondary">{me.location}</Badge>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div><p className="text-xs text-muted-foreground">Casual</p><p className="text-lg font-semibold">{me.leaveBalance.casual}</p></div>
            <div><p className="text-xs text-muted-foreground">Sick</p><p className="text-lg font-semibold">{me.leaveBalance.sick}</p></div>
            <div><p className="text-xs text-muted-foreground">Earned</p><p className="text-lg font-semibold">{me.leaveBalance.earned}</p></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Personal Information</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {personalInfo.map((info) => (
              <div key={info.label} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                <span className="text-sm text-muted-foreground">{info.label}</span>
                <span className="text-sm font-medium">{info.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Work Information</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {workInfo.map((info) => (
              <div key={info.label} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                <span className="text-sm text-muted-foreground">{info.label}</span>
                <span className="text-sm font-medium">{info.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader><CardTitle className="text-base">Skills</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {me.skills.map((s) => (
            <Badge key={s} variant="secondary">{s}</Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
