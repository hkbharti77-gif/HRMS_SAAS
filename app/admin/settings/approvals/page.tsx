'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { Switch } from '@/components/ui/switch';
import { approvalWorkflows } from '@/lib/mock-data';

export default function ApprovalsSettingsPage() {
  return (
    <div>
      <PageHeader
        title="Approvals"
        description="Configure multi-step approval workflows for different request types."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Settings' }, { label: 'Approvals' }]}
        action={{ label: 'New workflow', icon: 'Plus' }}
      />
      <div className="space-y-4">
        {approvalWorkflows.map((w) => (
          <Card key={w.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{w.name}</p>
                    <Badge variant={w.active ? 'secondary' : 'outline'}>{w.active ? 'Active' : 'Inactive'}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Trigger: {w.trigger}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Approvers:</span>
                    <div className="flex flex-wrap gap-1">
                      {w.approvers.map((a, i) => (
                        <React.Fragment key={a}>
                          <Badge variant="secondary">{a}</Badge>
                          {i < w.approvers.length - 1 && <Icon name="ChevronRight" className="h-3 w-3 text-muted-foreground" />}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked={w.active} />
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Edit3" className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
