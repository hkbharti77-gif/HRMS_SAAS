'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icon } from '@/components/shared/icon';
import { cn } from '@/lib/utils';

export default function OtpPage() {
  const router = useRouter();
  const [code, setCode] = React.useState(['', '', '', '', '', '']);
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    setCode((c) => {
      const n = [...c];
      n[i] = v;
      return n;
    });
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const verify = () => router.push('/admin/dashboard');

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
          <Icon name="ShieldCheck" className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Two-factor authentication
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <div className="flex justify-center gap-2">
        {code.map((d, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKey(i, e)}
            maxLength={1}
            inputMode="numeric"
            className={cn(
              'h-12 w-12 rounded-lg border bg-background text-center text-lg font-semibold ring-offset-background focus:outline-none focus:ring-2 focus:ring-brand-600',
              d ? 'border-brand-600' : 'border-input'
            )}
          />
        ))}
      </div>

      <Button className="w-full" onClick={verify}>
        <Icon name="Check" className="mr-2 h-4 w-4" />
        Verify & continue
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Didn't get the code?{' '}
        <button className="font-medium text-brand-600 hover:underline">
          Resend in 0:42
        </button>
      </div>
    </div>
  );
}
