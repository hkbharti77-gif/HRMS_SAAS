'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icon } from '@/components/shared/icon';

export default function CreateTenantPage() {
  const router = useRouter();
  return (
    <div>
      <PageHeader
        title="Create Tenant"
        description="Manually onboard a new company onto the platform."
        breadcrumbs={[
          { label: 'Super Admin', href: '/super-admin/dashboard' },
          { label: 'Tenants', href: '/super-admin/tenants' },
          { label: 'New' },
        ]}
      />
      <Card className="max-w-2xl">
        <CardHeader><CardTitle className="text-base">Company Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company name</Label>
              <Input placeholder="Acme Corp" />
            </div>
            <div className="space-y-2">
              <Label>Subdomain</Label>
              <Input placeholder="acme" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Industry</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {['Technology', 'Manufacturing', 'Finance', 'Healthcare', 'Retail', 'Education', 'Other'].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Company size</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Country</Label>
              <Input placeholder="United States" />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input placeholder="San Francisco" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4 max-w-2xl">
        <CardHeader><CardTitle className="text-base">Admin Account</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Admin first name</Label>
              <Input placeholder="Sarah" />
            </div>
            <div className="space-y-2">
              <Label>Admin last name</Label>
              <Input placeholder="Chen" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Admin email</Label>
            <Input type="email" placeholder="sarah@acme.com" />
          </div>
          <div className="space-y-2">
            <Label>Plan</Label>
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              {['Starter', 'Growth', 'Pro', 'Enterprise'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex gap-3 max-w-2xl">
        <Button variant="outline" onClick={() => router.push('/super-admin/tenants')}>Cancel</Button>
        <Button onClick={() => router.push('/super-admin/tenants')}>
          <Icon name="Check" className="mr-2 h-4 w-4" />
          Create tenant
        </Button>
      </div>
    </div>
  );
}
