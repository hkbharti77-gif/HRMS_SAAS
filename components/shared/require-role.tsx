'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { canAccess, roleHome } from '@/lib/permissions';
import { AccessDenied } from '@/components/shared/access-denied';

export function RequireRole({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const { isAuthenticated, role: currentRole } = useApp();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-muted-foreground">
        Redirecting to login...
      </div>
    );
  }

  if (!canAccess(`/${role}`, currentRole)) {
    return <AccessDenied homeHref={roleHome(currentRole)} />;
  }

  return <>{children}</>;
}
