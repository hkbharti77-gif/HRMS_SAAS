'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Icon } from '@/components/shared/icon';
import { tenants, platformInvoices, platformAuditLogs } from '@/lib/mock-data';
import { formatCurrency, formatDate, formatNumber, relativeTime } from '@/lib/format';

export default function TenantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tenant = tenants.find((t) => t.id === params.tenantId);

  if (!tenant) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-muted-foreground">Tenant not found.</p>
        <Link href="/super-admin/tenants" className="mt-4">
          <Button variant="outline">Back to tenants</Button>
        </Link>
      </div>
    );
  }

  const invoices = platformInvoices.filter((i) => i.tenant === tenant.name);

  return (
    <div>
      <PageHeader
        title={tenant.name}
        description={`${tenant.industry} · ${tenant.size} · ${tenant.city}, ${tenant.country}`}
        breadcrumbs={[
          { label: 'Super Admin', href: '/super-admin/dashboard' },
          { label: 'Tenants', href: '/super-admin/tenants' },
          { label: tenant.name },
        ]}
        action={{ label: 'Login as tenant', icon: 'LogIn', variant: 'outline' }}
      />

      {/* Header card */}
      <Card className="mb-6">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <AvatarBadge name={tenant.name} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{tenant.name}</h2>
                <StatusBadge status={tenant.status} dot />
              </div>
              <p className="text-sm text-muted-foreground">{tenant.domain}.peoplepilot.com</p>
              <p className="text-xs text-muted-foreground">Admin: {tenant.adminName} · {tenant.adminEmail}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Icon name="Edit3" className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Ban" className="mr-2 h-4 w-4" />
              Suspend
            </Button>
            <Button variant="destructive" size="sm">
              <Icon name="Trash2" className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Employees" value={formatNumber(tenant.employeeCount)} icon="Users" tone="brand" />
        <StatCard label="Plan" value={tenant.plan} icon="Tags" tone="info" />
        <StatCard label="MRR" value={tenant.mrr > 0 ? formatCurrency(tenant.mrr) : 'Trial'} icon="CreditCard" tone="success" />
        <StatCard label="Joined" value={formatDate(tenant.createdAt, 'short')} icon="CalendarDays" tone="warning" />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader><CardTitle className="text-base">Company Information</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Company name', value: tenant.name },
                { label: 'Domain', value: `${tenant.domain}.peoplepilot.com` },
                { label: 'Industry', value: tenant.industry },
                { label: 'Company size', value: tenant.size },
                { label: 'Country', value: tenant.country },
                { label: 'City', value: tenant.city },
                { label: 'Admin name', value: tenant.adminName },
                { label: 'Admin email', value: tenant.adminEmail },
                { label: 'Plan', value: tenant.plan },
                { label: 'Status', value: tenant.status },
                { label: 'Created', value: formatDate(tenant.createdAt, 'long') },
                { label: 'Primary color', value: tenant.primaryColor },
              ].map((f) => (
                <div key={f.label} className="flex flex-col gap-1 border-b pb-3">
                  <span className="text-xs text-muted-foreground">{f.label}</span>
                  <span className="text-sm font-medium">{f.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader><CardTitle className="text-base">Invoices</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {invoices.length === 0 && <p className="text-sm text-muted-foreground">No invoices yet.</p>}
                {invoices.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-medium">{formatCurrency(inv.amount)}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(inv.date)} · {inv.plan}</p>
                    </div>
                    <StatusBadge status={inv.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader><CardTitle className="text-base">Recent Activity</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {platformAuditLogs.slice(0, 6).map((log) => (
                <div key={log.id} className="flex items-start gap-3 border-b pb-3 last:border-0">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon name="Activity" className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{log.action}</span> — {log.target}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {log.actor} · {relativeTime(log.time)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
