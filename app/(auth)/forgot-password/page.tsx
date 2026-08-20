'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icon } from '@/components/shared/icon';

export default function ForgotPasswordPage() {
  const [sent, setSent] = React.useState(false);
  const [email, setEmail] = React.useState('');

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Reset your password
        </h1>
        <p className="text-sm text-muted-foreground">
          {sent
            ? 'Check your inbox for a reset link'
            : "Enter your email and we'll send you a reset link"}
        </p>
      </div>

      {sent ? (
        <div className="rounded-lg border bg-success-50 p-4 text-center dark:bg-success-500/10">
          <Icon
            name="Mail"
            className="mx-auto mb-2 h-8 w-8 text-success-600"
          />
          <p className="text-sm font-medium">
            Reset link sent to {email}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            The link expires in 30 minutes
          </p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
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
          <Button type="submit" className="w-full">
            <Icon name="Send" className="mr-2 h-4 w-4" />
            Send reset link
          </Button>
        </form>
      )}

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="inline-flex items-center font-medium text-brand-600 hover:underline">
          <Icon name="ArrowLeft" className="mr-1 h-4 w-4" />
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
