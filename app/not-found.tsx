import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
        <Icon name="Search" className="h-10 w-10" />
      </div>
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
        404
      </p>
      <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        The page you're looking for doesn't exist or may have been moved. Let's
        get you back on track.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/">
          <Button variant="outline">
            <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
            Go home
          </Button>
        </Link>
        <Link href="/login">
          <Button>Sign in</Button>
        </Link>
      </div>
    </div>
  );
}
