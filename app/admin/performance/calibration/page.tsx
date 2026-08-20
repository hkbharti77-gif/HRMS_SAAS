'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { nineBoxGrid } from '@/lib/mock-data';

const boxColors: Record<number, string> = {
  1: 'bg-muted/40',
  2: 'bg-muted/40',
  3: 'bg-info-50 dark:bg-info-500/10',
  4: 'bg-warning-50 dark:bg-warning-500/10',
  5: 'bg-warning-50 dark:bg-warning-500/10',
  6: 'bg-brand-50 dark:bg-brand-500/10',
  7: 'bg-warning-50 dark:bg-warning-500/10',
  8: 'bg-success-50 dark:bg-success-500/10',
  9: 'bg-success-50 dark:bg-success-500/10',
};

const boxLabels: Record<number, string> = {
  1: 'Underperformer',
  2: 'Inconsistent',
  3: 'Trusted Pro',
  4: 'Inconsistent',
  5: 'Core Player',
  6: 'High Performer',
  7: 'Growth Talent',
  8: 'Future Star',
  9: 'Star',
};

export default function CalibrationPage() {
  const grid: Record<number, typeof nineBoxGrid> = {};
  nineBoxGrid.forEach((e) => {
    if (!grid[e.box]) grid[e.box] = [];
    grid[e.box].push(e);
  });

  const layout = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
  ];

  return (
    <div>
      <PageHeader
        title="9-Box Grid"
        description="Calibrate talent by mapping performance against potential."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Performance' }, { label: 'Calibration' }]}
      />
      <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
        <span></span>
        <span>Potential &rarr;</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {layout.flat().map((boxNum) => (
          <Card key={boxNum} className={`min-h-[180px] ${boxColors[boxNum]}`}>
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">{boxLabels[boxNum]}</span>
                <span className="text-xs text-muted-foreground">{grid[boxNum]?.length ?? 0}</span>
              </div>
              <div className="space-y-2">
                {(grid[boxNum] ?? []).map((e) => (
                  <div key={e.id} className="flex items-center gap-2 rounded-lg bg-card p-2 shadow-sm">
                    <AvatarBadge name={e.employeeName} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium">{e.employeeName}</p>
                      <p className="truncate text-[10px] text-muted-foreground">{e.designation}</p>
                    </div>
                  </div>
                ))}
                {(!grid[boxNum] || grid[boxNum].length === 0) && (
                  <p className="py-4 text-center text-xs text-muted-foreground/60">Empty</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>&uarr; Performance</span>
        <span></span>
      </div>
    </div>
  );
}
