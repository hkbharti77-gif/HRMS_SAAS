'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Icon } from '@/components/shared/icon';
import { employees, leaveRequests, attendance, employeeDocuments } from '@/lib/mock-data';
import { formatCurrency, formatDate, relativeTime } from '@/lib/format';

export default function EmployeeProfilePage() {
  const params = useParams();
  const employee = employees.find((e) => e.id === params.employeeId);

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-muted-foreground">Employee not found.</p>
        <Link href="/admin/people"><Button variant="outline" className="mt-4">Back to directory</Button></Link>
      </div>
    );
  }

  const fullName = `${employee.firstName} ${employee.lastName}`;
  const empLeave = leaveRequests.filter((l) => l.employeeId === employee.id);
  const empAttendance = attendance.filter((a) => a.employeeId === employee.id);
  const empDocs = employeeDocuments.filter((d) => d.employeeId === employee.id);

  return (
    <div>
      <PageHeader
        title={fullName}
        description={`${employee.designation} · ${employee.department}`}
        breadcrumbs={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'People', href: '/admin/people' },
          { label: fullName },
        ]}
        action={{ label: 'Edit profile', icon: 'Edit3', variant: 'outline' }}
      />

      <Card className="mb-6">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <AvatarBadge name={fullName} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{fullName}</h2>
                <StatusBadge status={employee.status} dot />
              </div>
              <p className="text-sm text-muted-foreground">{employee.designation} · {employee.department}</p>
              <p className="text-xs text-muted-foreground">{employee.empCode} · {employee.email}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm"><Icon name="Mail" className="mr-2 h-4 w-4" />Message</Button>
            <Button variant="outline" size="sm"><Icon name="FileSignature" className="mr-2 h-4 w-4" />Request letter</Button>
            <Button variant="destructive" size="sm"><Icon name="LogOut" className="mr-2 h-4 w-4" />Offboard</Button>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Employment type</p><p className="mt-1 font-semibold">{employee.employmentType}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Joined</p><p className="mt-1 font-semibold">{formatDate(employee.joinDate, 'medium')}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Location</p><p className="mt-1 font-semibold">{employee.location}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Attrition risk</p><div className="mt-1"><StatusBadge status={employee.attritionRisk ?? 'Low'} tone={employee.attritionRisk === 'High' ? 'danger' : employee.attritionRisk === 'Medium' ? 'warning' : 'success'} /></div></CardContent></Card>
      </div>

      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="leave">Leave</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader><CardTitle className="text-base">Personal Information</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Full name', value: fullName },
                { label: 'Email', value: employee.email },
                { label: 'Phone', value: employee.phone },
                { label: 'Date of birth', value: employee.dob ? formatDate(employee.dob, 'medium') : '—' },
                { label: 'Gender', value: employee.gender },
                { label: 'Address', value: `${employee.location}` },
              ].map((f) => (
                <div key={f.label} className="flex flex-col gap-1 border-b pb-3">
                  <span className="text-xs text-muted-foreground">{f.label}</span>
                  <span className="text-sm font-medium">{f.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employment">
          <Card>
            <CardHeader><CardTitle className="text-base">Employment Details</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Employee code', value: employee.empCode },
                { label: 'Designation', value: employee.designation },
                { label: 'Department', value: employee.department },
                { label: 'Employment type', value: employee.employmentType },
                { label: 'Manager', value: employee.manager ?? '—' },
                { label: 'Join date', value: formatDate(employee.joinDate, 'long') },
                { label: 'Location', value: employee.location },
                { label: 'Status', value: employee.status },
              ].map((f) => (
                <div key={f.label} className="flex flex-col gap-1 border-b pb-3">
                  <span className="text-xs text-muted-foreground">{f.label}</span>
                  <span className="text-sm font-medium">{f.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">Documents</CardTitle>
              <Button size="sm" variant="outline"><Icon name="Upload" className="mr-2 h-4 w-4" />Upload</Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {empDocs.length === 0 && <p className="text-sm text-muted-foreground">No documents uploaded.</p>}
              {empDocs.map((d) => (
                <div key={d.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted"><Icon name="FileText" className="h-4 w-4 text-muted-foreground" /></div>
                    <div>
                      <p className="text-sm font-medium">{d.type}</p>
                      <p className="text-xs text-muted-foreground">{d.fileName} · {formatDate(d.uploadedOn, 'short')}</p>
                    </div>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave">
          <Card>
            <CardHeader><CardTitle className="text-base">Leave History</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {empLeave.length === 0 && <p className="text-sm text-muted-foreground">No leave records.</p>}
              {empLeave.map((l) => (
                <div key={l.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{l.type} leave · {l.days} day{l.days > 1 ? 's' : ''}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(l.from, 'short')} – {formatDate(l.to, 'short')}</p>
                  </div>
                  <StatusBadge status={l.status} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader><CardTitle className="text-base">Recent Attendance</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {empAttendance.length === 0 && <p className="text-sm text-muted-foreground">No attendance records.</p>}
              {empAttendance.slice(0, 7).map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{formatDate(a.date, 'medium')}</p>
                    <p className="text-xs text-muted-foreground">{a.punchIn} – {a.punchOut} · {a.hours}h</p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader><CardTitle className="text-base">Skills & Expertise</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((s) => (
                  <span key={s} className="rounded-lg bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">{s}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
