import { DashboardShell } from '@/components/layout/dashboard-shell';

export default function HrManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell role="hr-manager">{children}</DashboardShell>;
}
