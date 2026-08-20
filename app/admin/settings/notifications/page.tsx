'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const notifSettings = [
  { id: 'ns1', label: 'Leave requests', description: 'Notify managers when employees submit leave requests', channel: 'Email + In-app', enabled: true },
  { id: 'ns2', label: 'Expense approvals', description: 'Notify approvers when expenses are submitted', channel: 'Email + In-app', enabled: true },
  { id: 'ns3', label: 'Payroll completion', description: 'Notify admins when payroll run is completed', channel: 'Email', enabled: true },
  { id: 'ns4', label: 'New hires', description: 'Notify the team when a new employee joins', channel: 'In-app', enabled: false },
  { id: 'ns5', label: 'Birthdays & anniversaries', description: 'Daily digest of upcoming celebrations', channel: 'In-app', enabled: true },
  { id: 'ns6', label: 'Helpdesk ticket updates', description: 'Notify assignees when tickets are updated', channel: 'Email + In-app', enabled: true },
  { id: 'ns7', label: 'Performance reviews', description: 'Reminders for pending self-assessments', channel: 'Email', enabled: true },
  { id: 'ns8', label: 'Document expiry', description: 'Alert when employee documents are about to expire', channel: 'Email', enabled: false },
];

export default function NotificationsSettingsPage() {
  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Configure which events trigger notifications and through which channels."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Settings' }, { label: 'Notifications' }]}
      />
      <div className="max-w-2xl space-y-4">
        {notifSettings.map((n) => (
          <Card key={n.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex-1">
                <Label className="text-sm font-medium">{n.label}</Label>
                <p className="mt-0.5 text-xs text-muted-foreground">{n.description}</p>
                <span className="mt-1 inline-block text-xs text-muted-foreground">Channel: {n.channel}</span>
              </div>
              <Switch defaultChecked={n.enabled} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
