'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { ROLE_LABELS, ROLE_DESCRIPTIONS, roleHome } from '@/lib/permissions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icon } from '@/components/shared/icon';
import { cn } from '@/lib/utils';
import type { Role } from '@/lib/types';

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useApp();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [selectedRole, setSelectedRole] = React.useState<Role>('admin');
  const [loading, setLoading] = React.useState(false);

  const roles: Role[] = ['super-admin', 'admin', 'hr-manager', 'manager', 'employee'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      signIn(selectedRole);
      router.push(roleHome(selectedRole));
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your PeoplePilot account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-brand-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Demo — choose a role to explore</Label>
          <div className="grid grid-cols-2 gap-2">
            {roles.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRole(r)}
                className={cn(
                  'rounded-lg border p-2.5 text-left transition-all',
                  selectedRole === r
                    ? 'border-brand-600 bg-brand-50 ring-1 ring-brand-600 dark:bg-brand-500/10'
                    : 'border-border hover:border-brand-400 hover:bg-accent'
                )}
              >
                <p className="text-sm font-medium">{ROLE_LABELS[r]}</p>
                <p className="text-xs text-muted-foreground">
                  {ROLE_DESCRIPTIONS[r]}
                </p>
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <Icon name="RefreshCw" className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icon name="LogIn" className="mr-2 h-4 w-4" />
          )}
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={() => { signIn('admin'); router.push(roleHome('admin')); }}>
          <Icon name="Mail" className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline">
          <Icon name="Briefcase" className="mr-2 h-4 w-4" />
          Microsoft
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link href="/signup" className="font-medium text-brand-600 hover:underline">
          Start free trial
        </Link>
      </p>
    </div>
  );
}
