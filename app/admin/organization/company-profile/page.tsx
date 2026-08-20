'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icon } from '@/components/shared/icon';
import { tenants } from '@/lib/mock-data';

export default function CompanyProfilePage() {
  const tenant = tenants[0];
  return (
    <div>
      <PageHeader
        title="Company Profile"
        description="Manage your company's branding, contact, and organizational details."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Organization' }, { label: 'Company Profile' }]}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Company Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-600 text-2xl font-bold text-white">
                {tenant.name[0]}
              </div>
              <Button variant="outline" size="sm">
                <Icon name="Upload" className="mr-2 h-4 w-4" />
                Upload logo
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Company name</Label>
                <Input defaultValue={tenant.name} />
              </div>
              <div className="space-y-2">
                <Label>Domain</Label>
                <Input defaultValue={`${tenant.domain}.peoplepilot.com`} />
              </div>
              <div className="space-y-2">
                <Label>Industry</Label>
                <Input defaultValue={tenant.industry} />
              </div>
              <div className="space-y-2">
                <Label>Company size</Label>
                <Input defaultValue={tenant.size} />
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Input defaultValue={tenant.country} />
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Input defaultValue={tenant.city} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                defaultValue={`${tenant.name} is a leading ${tenant.industry.toLowerCase()} company with ${tenant.employeeCount} employees worldwide.`}
              />
            </div>
            <Button>Save changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Branding</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Primary color</Label>
              <div className="flex items-center gap-3">
                <input type="color" defaultValue="#2563eb" className="h-10 w-16 cursor-pointer rounded-md border" />
                <Input defaultValue="#2563eb" className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Favicon</Label>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">PP</div>
                <Button variant="outline" size="sm">Upload</Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Working hours</Label>
              <div className="flex gap-2">
                <Input defaultValue="09:00" />
                <Input defaultValue="18:00" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Asia/Kolkata'].map((tz) => <option key={tz}>{tz}</option>)}
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
