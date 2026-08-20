'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useApp } from '@/lib/store';
import { ROLE_LABELS, roleHome } from '@/lib/permissions';
import type { Role } from '@/lib/types';
import { tenants } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/shared/icon';
import { AvatarBadge } from '@/components/shared/avatar-badge';
import { relativeTime } from '@/lib/format';

const roles: Role[] = ['super-admin', 'admin', 'hr-manager', 'manager', 'employee'];

export function Topbar() {
  const { sidebarCollapsed, toggleSidebar, role, setRole, tenant, setTenant, notifications, unreadCount, markAllRead, markRead, signOut } = useApp();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const switchRole = (r: Role) => {
    setRole(r);
    if (r === 'super-admin') setTenant(null);
    else if (!tenant) setTenant(tenants[0]);
    router.push(roleHome(r));
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 shrink-0"
        onClick={toggleSidebar}
      >
        <Icon name={sidebarCollapsed ? 'Menu' : 'X'} className="h-5 w-5" />
      </Button>

      {/* Global search — opens Copilot command palette */}
      <button
        onClick={() => {
          const evt = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: navigator.platform.includes('Mac') ? false : true });
          window.dispatchEvent(evt);
        }}
        className="relative hidden flex-1 max-w-md cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent sm:flex"
      >
        <Icon name="Search" className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">Search or ask Copilot...</span>
        <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">⌘K</kbd>
      </button>

      <div className="flex flex-1 items-center justify-end gap-1.5 sm:flex-none">
        {/* Tenant switcher — only for super admin */}
        {role === 'super-admin' && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Icon name="Building2" className="mr-2 h-4 w-4" />
                {tenant ? tenant.name : 'All Tenants'}
                <Icon name="ChevronDown" className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Tenants</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTenant(null)}>
                All Tenants
              </DropdownMenuItem>
              {tenants.map((t) => (
                <DropdownMenuItem
                  key={t.id}
                  onClick={() => setTenant(t)}
                >
                  {t.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Icon name={mounted && theme === 'dark' ? 'Sun' : 'Moon'} className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Icon name="Bell" className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger-500 px-1 text-[10px] font-semibold text-white">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="text-sm font-semibold">Notifications</span>
              <button
                onClick={markAllRead}
                className="text-xs text-brand-600 hover:underline"
              >
                Mark all read
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto scrollbar-thin">
              {notifications.slice(0, 6).map((n) => (
                <button
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={cn(
                    'flex w-full gap-3 border-b px-4 py-3 text-left transition-colors hover:bg-accent',
                    !n.read && 'bg-brand-50/50 dark:bg-brand-500/5'
                  )}
                >
                  {!n.read && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                  )}
                  <div className={cn('min-w-0 flex-1', n.read && 'pl-5')}>
                    <p className="truncate text-sm font-medium">{n.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {n.description}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {relativeTime(n.time)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <Link
              href={`/${role === 'super-admin' ? 'super-admin' : role}/notifications`}
              className="block border-t px-4 py-2.5 text-center text-xs font-medium text-brand-600 hover:bg-accent"
            >
              View all notifications
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-accent">
              <AvatarBadge name="Demo User" size="sm" className="bg-brand-600" />
              <Icon name="ChevronDown" className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <p className="text-sm font-medium">Demo User</p>
                <p className="text-xs font-normal text-muted-foreground">
                  {ROLE_LABELS[role]}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Switch role (demo)
            </DropdownMenuLabel>
            {roles.map((r) => (
              <DropdownMenuItem
                key={r}
                onClick={() => switchRole(r)}
                className={cn(r === role && 'bg-accent')}
              >
                <Icon name="UserRound" className="mr-2 h-4 w-4" />
                {ROLE_LABELS[r]}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push(`/${role}/settings`)}>
              <Icon name="Settings" className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/login')}>
              <Icon name="LogOut" className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
