'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icon } from '@/components/shared/icon';

const steps = ['Company', 'Admin', 'Plan'] as const;

export default function SignupPage() {
  const router = useRouter();
  const { signIn } = useApp();
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({
    company: '', industry: 'Technology', size: '11-50',
    firstName: '', lastName: '', email: '', password: '',
    plan: 'Growth',
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const finish = () => {
    signIn('admin');
    router.push('/admin/dashboard');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Start your free trial
        </h1>
        <p className="text-sm text-muted-foreground">
          No credit card required · 14 days · cancel anytime
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div
              className={`flex items-center gap-2 ${
                i <= step ? 'text-brand-600' : 'text-muted-foreground'
              }`}
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                  i < step
                    ? 'bg-brand-600 text-white'
                    : i === step
                      ? 'bg-brand-100 text-brand-700 ring-2 ring-brand-600'
                      : 'bg-muted'
                }`}
              >
                {i < step ? <Icon name="Check" className="h-4 w-4" /> : i + 1}
              </div>
              <span className="text-sm font-medium">{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-px w-8 ${i < step ? 'bg-brand-600' : 'bg-border'}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="space-y-4">
        {step === 0 && (
          <>
            <div className="space-y-2">
              <Label>Company name</Label>
              <Input
                placeholder="Acme Corp"
                value={form.company}
                onChange={(e) => update('company', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Industry</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.industry}
                  onChange={(e) => update('industry', e.target.value)}
                >
                  {['Technology', 'Manufacturing', 'Finance', 'Healthcare', 'Retail', 'Education', 'Other'].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Company size</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.size}
                  onChange={(e) => update('size', e.target.value)}
                >
                  {['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
            <Button className="w-full" onClick={() => setStep(1)}>
              Continue
              <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
            </Button>
          </>
        )}

        {step === 1 && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>First name</Label>
                <Input
                  placeholder="Sarah"
                  value={form.firstName}
                  onChange={(e) => update('firstName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Last name</Label>
                <Input
                  placeholder="Chen"
                  value={form.lastName}
                  onChange={(e) => update('lastName', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Work email</Label>
              <Input
                type="email"
                placeholder="sarah@acme.com"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(0)}>
                Back
              </Button>
              <Button className="flex-1" onClick={() => setStep(2)}>
                Continue
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="space-y-3">
              {[
                { name: 'Starter', price: '$0', desc: 'Up to 10 employees', features: ['Core HR', 'Leave management'] },
                { name: 'Growth', price: '$5', desc: 'Per employee/month', features: ['Everything in Starter', 'Payroll', 'Performance', 'AI Assistant'] },
                { name: 'Pro', price: '$9', desc: 'Per employee/month', features: ['Everything in Growth', 'Hiring/ATS', 'Advanced analytics', 'Priority support'] },
              ].map((p) => (
                <button
                  key={p.name}
                  onClick={() => update('plan', p.name)}
                  className={`w-full rounded-lg border p-4 text-left transition-all ${
                    form.plan === p.name
                      ? 'border-brand-600 bg-brand-50 ring-1 ring-brand-600 dark:bg-brand-500/10'
                      : 'border-border hover:border-brand-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.desc}</p>
                    </div>
                    <p className="text-lg font-bold">{p.price}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="flex-1" onClick={finish}>
                <Icon name="Rocket" className="mr-2 h-4 w-4" />
                Create account
              </Button>
            </div>
          </>
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-brand-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
