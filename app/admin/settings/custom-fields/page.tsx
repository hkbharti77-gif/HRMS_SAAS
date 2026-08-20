'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { Switch } from '@/components/ui/switch';
import { customFields } from '@/lib/mock-data';

export default function CustomFieldsPage() {
  return (
    <div>
      <PageHeader
        title="Custom Fields"
        description="Add custom fields to employees, departments, and timesheets."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Settings' }, { label: 'Custom Fields' }]}
        action={{ label: 'Add field', icon: 'Plus' }}
      />
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Label</th>
                  <th className="px-4 py-3 font-medium">Entity</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Required</th>
                  <th className="px-4 py-3 font-medium">Active</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {customFields.map((f) => (
                  <tr key={f.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{f.label}</td>
                    <td className="px-4 py-3"><Badge variant="secondary">{f.entity}</Badge></td>
                    <td className="px-4 py-3 text-muted-foreground">{f.type}</td>
                    <td className="px-4 py-3">{f.required ? <span className="text-xs font-medium text-warning-600">Yes</span> : <span className="text-xs text-muted-foreground">No</span>}</td>
                    <td className="px-4 py-3"><Switch defaultChecked={f.active} /></td>
                    <td className="px-4 py-3"><Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Edit3" className="h-4 w-4" /></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
