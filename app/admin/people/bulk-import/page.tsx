'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { DataTable, type Column } from '@/components/shared/data-table';
import { StatusBadge } from '@/components/shared/status-badge';

const importRows = [
  { id: 'r1', name: 'John Doe', email: 'john@acme.com', department: 'Engineering', designation: 'SWE', status: 'Valid' },
  { id: 'r2', name: 'Jane Smith', email: 'jane@acme.com', department: 'Sales', designation: 'AE', status: 'Valid' },
  { id: 'r3', name: 'Bob Lee', email: 'bob@acme.com', department: 'HR', designation: 'HRBP', status: 'Valid' },
  { id: 'r4', name: 'Alice Wang', email: 'alice@acme.com', department: 'Finance', designation: 'Analyst', status: 'Error: Duplicate email' },
  { id: 'r5', name: 'Tom Reyes', email: 'tom@acme.com', department: 'Operations', designation: 'Manager', status: 'Valid' },
];

type Row = (typeof importRows)[number];

export default function BulkImportPage() {
  const [uploaded, setUploaded] = React.useState(false);
  const columns: Column<Row>[] = [
    { key: 'name', header: 'Name', cell: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'email', header: 'Email', cell: (r) => <span className="text-muted-foreground">{r.email}</span>, hideOnMobile: true },
    { key: 'department', header: 'Department', cell: (r) => r.department, hideOnMobile: true },
    { key: 'designation', header: 'Designation', cell: (r) => r.designation },
    { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} dot /> },
  ];

  return (
    <div>
      <PageHeader
        title="Bulk Import"
        description="Upload a CSV to onboard multiple employees at once."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'People', href: '/admin/people' }, { label: 'Bulk Import' }]}
      />
      <Card className="mb-4">
        <CardContent className="p-6">
          {!uploaded ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                <Icon name="Upload" className="h-6 w-6" />
              </div>
              <p className="mt-4 font-medium">Drop your CSV file here</p>
              <p className="text-sm text-muted-foreground">or click to browse — max 5MB</p>
              <Button className="mt-4" onClick={() => setUploaded(true)}>
                <Icon name="FilePlus" className="mr-2 h-4 w-4" />
                Select file
              </Button>
              <Button variant="link" size="sm" className="mt-2">
                <Icon name="Download" className="mr-1.5 h-3.5 w-3.5" />
                Download template
              </Button>
            </div>
          ) : (
            <div>
              <div className="mb-4 flex items-center gap-3 rounded-lg bg-success-50 p-3 text-sm text-success-700 dark:bg-success-500/10 dark:text-success-300">
                <Icon name="CheckCircle2" className="h-5 w-5" />
                <span>5 rows parsed · 4 valid · 1 error</span>
              </div>
              <DataTable columns={columns} data={importRows} searchKeys={[]} />
              <div className="mt-4 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setUploaded(false)}>Re-upload</Button>
                <Button>
                  <Icon name="UserPlus" className="mr-2 h-4 w-4" />
                  Import 4 employees
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
