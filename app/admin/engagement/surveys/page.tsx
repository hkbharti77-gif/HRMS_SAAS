'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaTrend } from '@/components/shared/charts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { surveys, engagementScore } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import type { Survey } from '@/lib/types';

export default function SurveysPage() {
  const active = surveys.filter((s) => s.status === 'Active').length;
  const totalResponses = surveys.reduce((s, sur) => s + sur.responses, 0);
  const avgSentiment = Math.round(surveys.reduce((s, sur) => s + sur.sentiment, 0) / surveys.length);

  return (
    <div>
      <PageHeader
        title="Surveys"
        description="Create and analyze employee engagement surveys."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Engagement' }, { label: 'Surveys' }]}
        action={{ label: 'New survey', icon: 'Plus' }}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Active surveys" value={active} icon="BarChart3" tone="brand" />
        <StatCard label="Total responses" value={totalResponses} icon="Users" tone="info" />
        <StatCard label="Avg sentiment" value={`${avgSentiment}%`} icon="TrendingUp" tone="success" />
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-4"><CardTitle className="text-base">Engagement Score Trend</CardTitle></CardHeader>
        <CardContent>
          <AreaTrend data={engagementScore} xKey="month" yKey="score" color="#0d9488" />
        </CardContent>
      </Card>

      <div className="space-y-4">
        {surveys.map((s) => (
          <Card key={s.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{s.title}</p>
                  <Badge variant="secondary">{s.status}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{s.responses} responses · Closes {formatDate(s.closesOn, 'short')}</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Sentiment</span>
                    <span className="font-medium">{s.sentiment}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${s.sentiment >= 75 ? 'bg-success-500' : s.sentiment >= 50 ? 'bg-warning-500' : 'bg-danger-500'}`} style={{ width: `${s.sentiment}%` }} />
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm"><Icon name="BarChart3" className="mr-1.5 h-3.5 w-3.5" />Results</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
