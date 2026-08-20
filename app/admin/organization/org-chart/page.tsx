'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { orgChartNodes } from '@/lib/mock-data';

function OrgNode({ node }: { node: (typeof orgChartNodes)[number] }) {
  const children = orgChartNodes.filter((n) => node.children.includes(n.id));
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-xl border bg-card p-4 shadow-soft transition-shadow hover:shadow-elevated">
        <div className="flex items-center gap-3">
          <AvatarBadge name={node.name} size="sm" />
          <div>
            <p className="text-sm font-semibold">{node.name}</p>
            <p className="text-xs text-muted-foreground">{node.title}</p>
          </div>
        </div>
      </div>
      {children.length > 0 && (
        <>
          <div className="h-8 w-px bg-border" />
          <div className="flex flex-wrap justify-center gap-6">
            {children.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                <div className="h-8 w-px bg-border" />
                <OrgNode node={child} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function OrgChartPage() {
  const root = orgChartNodes.find((n) => n.id === 'ceo')!;
  return (
    <div>
      <PageHeader
        title="Org Chart"
        description="Visual hierarchy of your organization's reporting structure."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Organization' }, { label: 'Org Chart' }]}
        action={{ label: 'Export', icon: 'Download', variant: 'outline' }}
      />
      <Card>
        <CardContent className="overflow-x-auto p-8">
          <div className="flex min-w-fit justify-center">
            <OrgNode node={root} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
