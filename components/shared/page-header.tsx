'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: string;
    variant?: 'default' | 'outline' | 'secondary';
  };
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                {b.href ? (
                  <Link href={b.href} className="hover:text-foreground transition-colors">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <Icon name="ChevronRight" className="h-3 w-3" />
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground max-w-2xl">{description}</p>
        )}
      </div>
      {action && (
        <div className="flex items-center gap-2">
          {action.href ? (
            <Link href={action.href}>
              <Button variant={action.variant ?? 'default'} size="sm">
                {action.icon && <Icon name={action.icon} className="mr-2 h-4 w-4" />}
                {action.label}
              </Button>
            </Link>
          ) : (
            <Button
              variant={action.variant ?? 'default'}
              size="sm"
              onClick={action.onClick}
            >
              {action.icon && <Icon name={action.icon} className="mr-2 h-4 w-4" />}
              {action.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
