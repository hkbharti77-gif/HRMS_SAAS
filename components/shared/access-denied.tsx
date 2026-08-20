'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';

export function AccessDenied({ homeHref }: { homeHref: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-danger-50 text-danger-600 dark:bg-danger-500/10 dark:text-danger-400">
        <Icon name="ShieldCheck" className="h-10 w-10" />
      </div>
      <p className="text-sm font-semibold uppercase tracking-wide text-danger-600">
        403 — Access Denied
      </p>
      <h1 className="mt-2 text-2xl font-semibold">You don't have access to this page</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Your current role doesn't include this area. If you believe this is an
        error, contact your administrator or switch roles from the profile menu.
      </p>
      <Link href={homeHref} className="mt-6">
        <Button>
          <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
          Back to dashboard
        </Button>
      </Link>
    </div>
  );
}
