'use client';

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { kbArticles } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';

export default function KnowledgeBasePage() {
  return (
    <div>
      <PageHeader
        title="Knowledge Base"
        description="Self-service help articles for employees."
        breadcrumbs={[{ label: 'Admin', href: '/admin/dashboard' }, { label: 'Helpdesk' }, { label: 'Knowledge Base' }]}
        action={{ label: 'New article', icon: 'Plus' }}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {kbArticles.map((a) => (
          <Card key={a.id} className="transition-shadow hover:shadow-soft">
            <CardContent className="flex items-start justify-between p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                  <Icon name="BookMarked" className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{a.title}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <Badge variant="secondary">{a.category}</Badge>
                    <span>{a.views} views</span>
                    <span className="flex items-center gap-1"><Icon name="ThumbsUp" className="h-3 w-3" />{a.helpful}% helpful</span>
                    <span>Updated {formatDate(a.updatedOn, 'short')}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Edit3" className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Icon name="Eye" className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
