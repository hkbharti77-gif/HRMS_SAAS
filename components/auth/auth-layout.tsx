'use client';

import Link from 'next/link';
import { Icon } from '@/components/shared/icon';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-brand-700 p-12 text-white lg:flex">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-lg font-bold">
              P
            </div>
            <span className="text-xl font-semibold">PeoplePilot</span>
          </div>
        </div>
        <div className="relative space-y-6">
          <h2 className="text-3xl font-semibold leading-tight">
            The HR platform your people will actually love.
          </h2>
          <p className="max-w-md text-white/80">
            Hire, onboard, pay, and grow your team — all in one place. Built for
            small and mid-size companies that care about great employee experience.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { icon: 'Users', label: '2,400+ companies' },
              { icon: 'CheckSquare', label: '12M+ employees' },
              { icon: 'TrendingUp', label: '40% less admin time' },
              { icon: 'Star', label: '4.9/5 rating' },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2.5 rounded-xl bg-white/10 p-3 backdrop-blur"
              >
                <Icon name={s.icon} className="h-5 w-5" />
                <span className="text-sm font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-xs text-white/60">
          © 2025 PeoplePilot. All rights reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="mb-8 flex items-center justify-center gap-2.5 lg:hidden"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white font-bold">
              P
            </div>
            <span className="text-lg font-semibold">PeoplePilot</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
