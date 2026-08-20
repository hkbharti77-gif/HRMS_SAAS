'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { DataTable, type Column } from '@/components/shared/data-table';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { FormDrawer } from '@/components/shared/form-drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { assets } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/format';
import type { Asset } from '@/lib/types';

export default function AssetsPage() {
  const [open, setOpen] = React.useState(false);
  const available = assets.filter((a) => a.status === 'Available').length;
  const assigned = assets.filter((a) => a.status === 'Assigned').length;
  const repair = assets.filter((a) => a.status === 'Under Repair').length;
  const totalValue = assets.reduce((s, a) => s + a.value, 0);

  const columns: Column<Asset>[] = [
    {
      key: 'name',
      header: 'Asset',
      sortable: true,
      sortValue: (r) => r.name,
      cell: (r) => <span className="font-medium">{r.name}</span>,
    },
    {
      key: 'type',
      header: 'Type',
      sortable: true,
      sortValue: (r) => r.type,
      cell: (r) => <span className="text-muted-foreground">{r.type}</span>,
      hideOnMobile: true,
    },
    {
      key: 'serial',
      header: 'Serial',
      cell: (r) => <span className="font-mono text-xs text-muted-foreground">{r.serial}</span>,
      hideOnMobile: true,
    },
    {
      key: 'assignedTo',
      header: 'Assigned To',
      sortable: true,
      sortValue: (r) => r.assignedTo ?? 'zzz',
      cell: (r) => r.assignedTo ? (
        <div className="flex items-center gap-2"><AvatarBadge name={r.assignedTo} size="sm" /><span className="text-sm">{r.assignedTo}</span></div>
      ) : <span className="text-muted-foreground">—</span>,
    },
    {
      key: 'value',
      header: 'Value',
      sortable: true,
      sortValue: (r) => r.value,
      cell: (r) => <span className="font-medium">{formatCurrency(r.value)}</span>,
      hideOnMobile: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      sortValue: (r) => r.status,
      cell: (r) => <StatusBadge status={r.status} dot />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Asset Inventory"
        description="Track company assets, assignments, and depreciation."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Assets' }]}
        action={{ label: 'Add asset', icon: 'Plus', onClick: () => setOpen(true) }}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Available" value={available} icon="Box" tone="success" />
        <StatCard label="Assigned" value={assigned} icon="Laptop" tone="brand" />
        <StatCard label="Under repair" value={repair} icon="Wrench" tone="warning" />
        <StatCard label="Total value" value={formatCurrency(totalValue, 'USD', true)} icon="Coins" tone="info" />
      </div>
      <DataTable
        columns={columns}
        data={assets}
        searchKeys={['name', 'type', 'serial', 'assignedTo', 'status']}
        searchPlaceholder="Search assets..."
      />

      <FormDrawer
        open={open}
        onOpenChange={setOpen}
        title="Add Asset"
        description="Register a new company asset."
        onSubmit={() => setOpen(false)}
        submitLabel="Add"
      >
        <div className="space-y-2"><Label>Asset name</Label><Input placeholder="e.g. MacBook Pro 16" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Type</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>Laptop</option><option>Monitor</option><option>Phone</option><option>Peripheral</option><option>Furniture</option></select></div>
          <div className="space-y-2"><Label>Serial number</Label><Input placeholder="SN-XXXX" /></div>
        </div>
        <div className="space-y-2"><Label>Value (USD)</Label><Input type="number" placeholder="2000" /></div>
      </FormDrawer>
    </div>
  );
}
