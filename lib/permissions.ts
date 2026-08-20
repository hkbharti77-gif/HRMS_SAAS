import type { Role } from './types';

const ROLE_HOME: Record<Role, string> = {
  'super-admin': '/super-admin/dashboard',
  admin: '/admin/dashboard',
  'hr-manager': '/hr-manager/dashboard',
  manager: '/manager/dashboard',
  employee: '/employee/dashboard',
};

export function roleHome(role: Role): string {
  return ROLE_HOME[role];
}

export function canAccess(path: string, role: Role): boolean {
  if (path.startsWith('/super-admin')) return role === 'super-admin';
  if (path.startsWith('/admin')) return role === 'admin';
  if (path.startsWith('/hr-manager')) return role === 'hr-manager';
  if (path.startsWith('/manager')) return role === 'manager';
  if (path.startsWith('/employee')) return role === 'employee';
  return true;
}

export const ROLE_LABELS: Record<Role, string> = {
  'super-admin': 'Super Admin',
  admin: 'Company Admin',
  'hr-manager': 'HR Manager',
  manager: 'Manager',
  employee: 'Employee',
};

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  'super-admin': 'Platform owner — manage all tenants, billing & system health',
  admin: 'Full control of your company account, all modules & settings',
  'hr-manager': 'Manage people, leave, payroll, performance & engagement',
  manager: 'Lead a team — approvals, performance & attendance',
  employee: 'Self-service — profile, leave, payslips & more',
};
