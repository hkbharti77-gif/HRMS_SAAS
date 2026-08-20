import { DashboardShell } from '@/components/layout/dashboard-shell';

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell role="employee">{children}</DashboardShell>;
}
