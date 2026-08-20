'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useApp } from '@/lib/store';
import { navConfig } from '@/lib/nav';
import { Icon } from '@/components/shared/icon';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import type { Role } from '@/lib/types';

export function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const { sidebarCollapsed, tenant } = useApp();
  const items = navConfig[role];
  const [expanded, setExpanded] = React.useState<string | null>(null);

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 flex flex-col border-r bg-sidebar text-sidebar-foreground transition-[width] duration-200',
        sidebarCollapsed ? 'w-[68px]' : 'w-64'
      )}
    >
      <div className="flex h-16 items-center gap-2.5 border-b px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white font-bold">
          P
        </div>
        {!sidebarCollapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">PeoplePilot</p>
            <p className="truncate text-xs text-muted-foreground">
              {tenant?.name ?? 'HRMS'}
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4 scrollbar-thin">
        {items.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/');
          const hasChildren = !!item.children?.length;
          const isOpen = expanded === item.title || (isActive && hasChildren);

          if (hasChildren && !sidebarCollapsed) {
            return (
              <div key={item.title}>
                <button
                  onClick={() =>
                    setExpanded((e) => (e === item.title ? null : item.title))
                  }
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-brand-50 font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  <Icon name={item.icon} className="h-5 w-5 shrink-0" />
                  <span className="flex-1 text-left">{item.title}</span>
                  <Icon
                    name="ChevronDown"
                    className={cn(
                      'h-4 w-4 transition-transform',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="ml-4 mt-0.5 space-y-0.5 border-l pl-3">
                    {item.children!.map((child) => {
                      const childActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-colors',
                            childActive
                              ? 'bg-brand-50 font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                              : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                          )}
                        >
                          <Icon name={child.icon} className="h-4 w-4 shrink-0 opacity-70" />
                          {child.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              title={sidebarCollapsed ? item.title : undefined}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive && !hasChildren
                  ? 'bg-brand-600 font-medium text-white'
                  : isActive
                    ? 'bg-brand-50 font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <Icon name={item.icon} className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && <span className="flex-1">{item.title}</span>}
              {!sidebarCollapsed && item.badge && (
                <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
          <AvatarBadge name="You" size="sm" className="bg-brand-600" />
          {!sidebarCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">Your Account</p>
              <p className="truncate text-xs text-muted-foreground">Demo User</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
