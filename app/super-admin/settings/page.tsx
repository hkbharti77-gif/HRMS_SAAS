'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { Icon } from '@/components/shared/icon';

export default function SuperAdminSettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your super admin profile and platform preferences."
        breadcrumbs={[{ label: 'Super Admin', href: '/super-admin/dashboard' }, { label: 'Settings' }]}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Profile</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <AvatarBadge name="Platform Admin" size="lg" className="bg-brand-600" />
              <Button variant="outline" size="sm">
                <Icon name="Upload" className="mr-2 h-4 w-4" />
                Change photo
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First name</Label>
                <Input defaultValue="Platform" />
              </div>
              <div className="space-y-2">
                <Label>Last name</Label>
                <Input defaultValue="Admin" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" defaultValue="admin@peoplepilot.com" />
            </div>
            <Button>Save changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Security</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label>New password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">Two-factor authentication</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button>Update password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Notifications</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'New tenant signup', desc: 'Get notified when a company joins', on: true },
              { label: 'Payment failures', desc: 'Alert when a payment fails', on: true },
              { label: 'SLA breaches', desc: 'Alert when a support SLA is breached', on: true },
              { label: 'Weekly digest', desc: 'Summary of platform activity every Monday', on: false },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{n.label}</p>
                  <p className="text-xs text-muted-foreground">{n.desc}</p>
                </div>
                <Switch defaultChecked={n.on} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Platform Configuration</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Platform name</Label>
              <Input defaultValue="PeoplePilot" />
            </div>
            <div className="space-y-2">
              <Label>Support email</Label>
              <Input type="email" defaultValue="support@peoplepilot.com" />
            </div>
            <div className="space-y-2">
              <Label>Default currency</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {['USD', 'EUR', 'GBP', 'INR', 'AUD'].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">Allow self-signup</p>
                <p className="text-xs text-muted-foreground">Let companies register without invitation</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button>Save configuration</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
