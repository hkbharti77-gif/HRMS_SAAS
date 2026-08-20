'use client';

import * as React from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { AiAssistant } from '@/components/shared/ai-assistant';
import { CommandPalette } from '@/components/shared/command-palette';
import { RequireRole } from '@/components/shared/require-role';
import { useApp } from '@/lib/store';
import { cn } from '@/lib/utils';
import type { Role } from '@/lib/types';

export function DashboardShell({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const { sidebarCollapsed } = useApp();

  return (
    <RequireRole role={role}>
      <div className="min-h-screen bg-background">
        <Sidebar role={role} />
        <div
          className={cn(
            'flex flex-col transition-[padding] duration-200',
            sidebarCollapsed ? 'md:pl-[68px]' : 'md:pl-64'
          )}
        >
          <Topbar />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 animate-fade-in">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
        <AiAssistant />
        <CommandPalette />
      </div>
    </RequireRole>
  );
}
