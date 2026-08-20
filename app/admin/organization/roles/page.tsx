'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/shared/icon';
import { rolePermissions } from '@/lib/mock-data';

const permissionModules = [
  { name: 'People', perms: ['View directory', 'Add employee', 'Edit employee', 'Offboard', 'View salary', 'Manage documents'] },
  { name: 'Attendance', perms: ['View team attendance', 'Approve regularization', 'Manage shifts', 'Export attendance'] },
  { name: 'Leave', perms: ['View balances', 'Approve leave', 'Manage policies', 'Carry forward'] },
  { name: 'Payroll', perms: ['View payslips', 'Run payroll', 'Manage structures', 'Approve reimbursements', 'Manage compliance'] },
  { name: 'Performance', perms: ['View goals', 'Create review cycles', 'View reviews', 'Calibrate ratings'] },
  { name: 'Hiring', perms: ['View pipeline', 'Create requisitions', 'Manage candidates', 'Approve offers'] },
  { name: 'Reports', perms: ['View reports', 'Create reports', 'Export data', 'Schedule reports'] },
  { name: 'Settings', perms: ['View settings', 'Manage roles', 'Manage integrations', 'Billing access'] },
];

export default function RolesPermissionsPage() {
  const [selectedRole, setSelectedRole] = React.useState('r5');
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});

  return (
    <div>
      <PageHeader
        title="Roles & Permissions"
        description="Define what each role can see and do across the platform."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Organization' }, { label: 'Roles & Permissions' }]}
        action={{ label: 'Add role', icon: 'Plus' }}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-base">Roles</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {rolePermissions.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRole(r.id)}
                className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors ${
                  selectedRole === r.id ? 'border-brand-600 bg-brand-50 dark:bg-brand-500/10' : 'hover:bg-accent'
                }`}
              >
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.users} users · {r.permissions} perms</p>
                </div>
                <Icon name="ChevronRight" className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">
              {rolePermissions.find((r) => r.id === selectedRole)?.name} — Permissions
            </CardTitle>
            <Button size="sm">Save changes</Button>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              {rolePermissions.find((r) => r.id === selectedRole)?.description}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {permissionModules.map((mod) => (
                <div key={mod.name} className="rounded-lg border p-3">
                  <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">{mod.name}</p>
                  <div className="space-y-2">
                    {mod.perms.map((p) => {
                      const key = `${mod.name}-${p}`;
                      return (
                        <label key={p} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={checked[key] ?? false}
                            onChange={(e) => setChecked((c) => ({ ...c, [key]: e.target.checked }))}
                            className="h-4 w-4 rounded border-input"
                          />
                          <span className="text-muted-foreground">{p}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
