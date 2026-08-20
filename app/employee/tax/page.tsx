'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { myTaxDeclaration } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/format';

export default function EmployeeTaxPage() {
  const totalDeclared = myTaxDeclaration.reduce((s, t) => s + t.declared, 0);
  const totalLimit = myTaxDeclaration.reduce((s, t) => s + t.limit, 0);
  const savings = Math.min(totalDeclared, totalLimit);

  return (
    <div>
      <PageHeader
        title="Tax Declaration"
        description="Declare investments and deductions for tax optimization."
        breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Payroll' }, { label: 'Tax' }]}
        action={{ label: 'Submit declaration', icon: 'Send' }}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total declared" value={formatCurrency(totalDeclared)} icon="FileSpreadsheet" tone="brand" />
        <StatCard label="Total eligible" value={formatCurrency(totalLimit)} icon="Landmark" tone="info" />
        <StatCard label="Tax savings" value={formatCurrency(savings * 0.3)} icon="Coins" tone="success" footer="est. @30% slab" />
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Investment Declarations</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Section</th>
                  <th className="px-4 py-3 font-medium">Limit</th>
                  <th className="px-4 py-3 font-medium">Declared</th>
                  <th className="px-4 py-3 font-medium">Progress</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {myTaxDeclaration.map((t) => {
                  const pct = t.limit > 0 ? Math.min(100, Math.round((t.declared / t.limit) * 100)) : 0;
                  return (
                    <tr key={t.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">{t.section}</td>
                      <td className="px-4 py-3 text-muted-foreground">{t.limit > 0 ? formatCurrency(t.limit) : '—'}</td>
                      <td className="px-4 py-3">{t.declared > 0 ? formatCurrency(t.declared) : '—'}</td>
                      <td className="px-4 py-3">
                        {t.limit > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-brand-500" style={{ width: `${pct}%` }} /></div>
                            <span className="text-xs text-muted-foreground">{pct}%</span>
                          </div>
                        ) : <span className="text-xs text-muted-foreground">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium ${t.verified ? 'text-success-600' : 'text-warning-600'}`}>{t.verified ? 'Verified' : 'Pending'}</span>
                      </td>
                      <td className="px-4 py-3"><Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Edit3" className="h-4 w-4" /></Button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
