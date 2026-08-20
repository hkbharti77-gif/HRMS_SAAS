'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function GeneralSettingsPage() {
  return (
    <div>
      <PageHeader
        title="General Settings"
        description="Company-wide configuration and preferences."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Settings' }]}
      />
      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Company Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Company name</Label><Input defaultValue="Acme Corporation" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Domain</Label><Input defaultValue="acme.com" /></div>
              <div className="space-y-2"><Label>Industry</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>Technology</option><option>Finance</option><option>Healthcare</option><option>Manufacturing</option><option>Retail</option></select></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Timezone</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>America/Los_Angeles (PST)</option><option>America/New_York (EST)</option><option>Europe/London (GMT)</option><option>Asia/Tokyo (JST)</option></select></div>
              <div className="space-y-2"><Label>Date format</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>MM/DD/YYYY</option><option>DD/MM/YYYY</option><option>YYYY-MM-DD</option></select></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Payroll Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Currency</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option><option>INR (₹)</option></select></div>
              <div className="space-y-2"><Label>Pay cycle</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>Monthly</option><option>Bi-weekly</option><option>Weekly</option></select></div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button><Icon name="Save" className="mr-2 h-4 w-4" />Save changes</Button>
        </div>
      </div>
    </div>
  );
}
