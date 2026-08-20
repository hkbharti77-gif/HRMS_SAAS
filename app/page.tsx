'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { AvatarBadge } from '@/components/shared/avatar-badge';

const features = [
  { icon: 'Users', title: 'People Management', desc: 'Employee directory, profiles, onboarding & offboarding — all in one place.' },
  { icon: 'CalendarCheck', title: 'Attendance & Leave', desc: 'Punch in/out, leave policies, approvals, and team calendars.' },
  { icon: 'Banknote', title: 'Payroll & Compliance', desc: 'Run payroll in minutes. Generate payslips, manage taxes & compliance.' },
  { icon: 'TrendingUp', title: 'Performance', desc: 'Goals, OKRs, 360° reviews, and continuous feedback.' },
  { icon: 'Briefcase', title: 'Hiring & ATS', desc: 'Post jobs, track candidates on a Kanban pipeline, and make offers.' },
  { icon: 'Sparkles', title: 'AI-Powered', desc: 'An AI assistant that answers HR questions and surfaces insights.' },
];

const stats = [
  { label: 'Companies', value: '2,400+' },
  { label: 'Employees managed', value: '12M+' },
  { label: 'Avg setup time', value: '8 min' },
  { label: 'Customer rating', value: '4.9/5' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white font-bold">
              P
            </div>
            <span className="text-lg font-semibold">PeoplePilot</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <Link href="#features" className="hover:text-foreground">Features</Link>
            <Link href="#pricing" className="hover:text-foreground">Pricing</Link>
            <Link href="/login" className="hover:text-foreground">Sign in</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Start free</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            background:
              'radial-gradient(60% 50% at 50% 0%, hsl(var(--brand-100, 219 83% 90%)) 0%, transparent 60%)',
          }}
        />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
              <Icon name="Sparkles" className="h-3.5 w-3.5 text-brand-600" />
              Now with AI-powered HR assistant
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              The HR platform your{' '}
              <span className="text-brand-600">people will love</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Hire, onboard, pay, and grow your team — all in one beautiful
              platform. Built for small and mid-size companies that put employees
              first.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  <Icon name="Rocket" className="mr-2 h-5 w-5" />
                  Start 14-day free trial
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Icon name="LogIn" className="mr-2 h-5 w-5" />
                  Explore the demo
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              No credit card required · Cancel anytime
            </p>
          </div>

          {/* Hero mockup */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="rounded-2xl border bg-card p-2 shadow-elevated">
              <div className="flex items-center gap-1.5 border-b px-3 py-2">
                <div className="h-3 w-3 rounded-full bg-danger-400" />
                <div className="h-3 w-3 rounded-full bg-warning-400" />
                <div className="h-3 w-3 rounded-full bg-success-400" />
              </div>
              <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-3">
                {[
                  { label: 'Total employees', value: '342', icon: 'Users', tone: 'bg-brand-50 text-brand-600' },
                  { label: 'Present today', value: '298', icon: 'CalendarCheck', tone: 'bg-success-50 text-success-600' },
                  { label: 'Pending approvals', value: '7', icon: 'CheckSquare', tone: 'bg-warning-50 text-warning-600' },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border bg-background p-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.tone}`}>
                      <Icon name={s.icon} className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-2xl font-semibold">{s.value}</p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-semibold tracking-tight">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Everything HR, in one place
          </h2>
          <p className="mt-4 text-muted-foreground">
            From hire to retire — manage your entire employee lifecycle with
            modules that work together seamlessly.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border bg-card p-6 transition-shadow hover:shadow-elevated"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-transform group-hover:scale-110 dark:bg-brand-500/10">
                <Icon name={f.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <Icon name="Star" className="mx-auto h-8 w-8 text-warning-500" />
          <p className="mt-6 text-xl font-medium leading-relaxed">
            "We switched from 4 different tools to PeoplePilot and cut our HR
            admin time by 40%. Our employees actually enjoy using it — the
            self-service portal is a game changer."
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <AvatarBadge name="Sarah Chen" size="md" />
            <div className="text-left">
              <p className="text-sm font-semibold">Sarah Chen</p>
              <p className="text-xs text-muted-foreground">VP People, Acme Corp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pay per employee. No hidden fees. Scale as you grow.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            { name: 'Starter', price: 'Free', desc: 'For teams up to 10', features: ['Core HR & directory', 'Leave management', 'Employee self-service', 'Mobile app'], cta: 'Get started', highlight: false },
            { name: 'Growth', price: '$5', unit: '/employee/month', desc: 'For growing teams', features: ['Everything in Starter', 'Payroll & compliance', 'Performance reviews', 'AI HR Assistant', 'Expenses & helpdesk'], cta: 'Start free trial', highlight: true },
            { name: 'Pro', price: '$9', unit: '/employee/month', desc: 'For scaling companies', features: ['Everything in Growth', 'Hiring & ATS', 'Advanced analytics', 'Custom roles & workflows', 'Priority support'], cta: 'Start free trial', highlight: false },
          ].map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl border bg-card p-6 ${
                p.highlight ? 'border-brand-600 ring-1 ring-brand-600 shadow-elevated' : ''
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <p className="text-sm font-semibold text-muted-foreground">{p.name}</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">{p.price}</span>
                {p.unit && <span className="text-sm text-muted-foreground">{p.unit}</span>}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Icon name="Check" className="mt-0.5 h-4 w-4 shrink-0 text-success-600" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="mt-6 block">
                <Button className="w-full" variant={p.highlight ? 'default' : 'outline'}>
                  {p.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-brand-700 px-8 py-16 text-center text-white">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to transform your HR?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Join 2,400+ companies using PeoplePilot to manage their people.
              Get started in under 8 minutes.
            </p>
            <Link href="/signup" className="mt-8 inline-block">
              <Button size="lg" variant="secondary">
                <Icon name="Rocket" className="mr-2 h-5 w-5" />
                Start your free trial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white text-sm font-bold">
                P
              </div>
              <span className="font-semibold">PeoplePilot</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 PeoplePilot. The modern HRMS for growing teams.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
