'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { tenants } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function TenantPickerPage() {
  const router = useRouter();
  const { setTenant, signIn } = useApp();

  const pick = (id: string) => {
    const t = tenants.find((x) => x.id === id)!;
    setTenant(t);
    signIn('admin', t);
    router.push('/admin/dashboard');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Select company</h1>
        <p className="text-sm text-muted-foreground">
          You have access to multiple companies. Choose one to continue.
        </p>
      </div>

      <div className="space-y-2">
        {tenants.slice(0, 5).map((t) => (
          <button
            key={t.id}
            onClick={() => pick(t.id)}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all hover:border-brand-400 hover:bg-accent'
            )}
          >
            <AvatarBadge name={t.name} size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{t.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {t.employeeCount} employees · {t.industry}
              </p>
            </div>
            <StatusBadge status={t.status} />
            <Icon name="ArrowRight" className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}
