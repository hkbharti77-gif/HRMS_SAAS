export type Role = 'super-admin' | 'admin' | 'hr-manager' | 'manager' | 'employee';

export type TenantStatus = 'active' | 'trial' | 'suspended' | 'cancelled';
export type PlanTier = 'Starter' | 'Growth' | 'Pro' | 'Enterprise';

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  logoUrl?: string;
  primaryColor: string;
  industry: string;
  size: string;
  plan: PlanTier;
  status: TenantStatus;
  employeeCount: number;
  adminEmail: string;
  adminName: string;
  createdAt: string;
  mrr: number;
  country: string;
  city: string;
}

export type EmployeeStatus =
  | 'active'
  | 'on-leave'
  | 'remote'
  | 'probation'
  | 'notice'
  | 'exited';

export interface Employee {
  id: string;
  empCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  department: string;
  designation: string;
  location: string;
  manager?: string;
  status: EmployeeStatus;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Intern';
  joinDate: string;
  dob?: string;
  gender: 'Male' | 'Female' | 'Other';
  salary: number;
  attritionRisk?: 'Low' | 'Medium' | 'High';
  leaveBalance: { casual: number; sick: number; earned: number };
  skills: string[];
}

export interface Department {
  id: string;
  name: string;
  head: string;
  headcount: number;
  parent?: string;
  description: string;
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  type: 'Casual' | 'Sick' | 'Earned' | 'Unpaid' | 'Maternity';
  from: string;
  to: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
  approver?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeName: string;
  employeeId: string;
  date: string;
  punchIn: string;
  punchOut: string;
  hours: number;
  status: 'Present' | 'Late' | 'Absent' | 'Half-day' | 'WFH' | 'Leave';
  location: string;
}

export interface Payslip {
  id: string;
  employeeName: string;
  employeeId: string;
  month: string;
  gross: number;
  deductions: number;
  net: number;
  status: 'Generated' | 'Pending' | 'Disbursed';
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  applicants: number;
  stage: 'Open' | 'On Hold' | 'Closed';
  postedOn: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  role: string;
  stage:
    | 'Applied'
    | 'Screening'
    | 'Interview'
    | 'Offer'
    | 'Hired'
    | 'Rejected';
  rating: number;
  matchScore: number;
  appliedOn: string;
  source: string;
  avatarUrl?: string;
}

export interface Ticket {
  id: string;
  subject: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  raisedBy: string;
  assignedTo?: string;
  createdAt: string;
}

export interface ExpenseClaim {
  id: string;
  employeeName: string;
  category: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Reimbursed';
  description: string;
}

export interface Asset {
  id: string;
  name: string;
  type: string;
  serial: string;
  status: 'Available' | 'Assigned' | 'Under Repair' | 'Retired';
  assignedTo?: string;
  assignedOn?: string;
  value: number;
}

export interface Goal {
  id: string;
  title: string;
  owner: string;
  ownerType: 'Company' | 'Team' | 'Individual';
  progress: number;
  dueDate: string;
  status: 'On Track' | 'At Risk' | 'Behind' | 'Completed';
  keyResults: { id: string; title: string; done: boolean }[];
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'leave' | 'expense' | 'ticket' | 'payroll' | 'system' | 'hiring';
  read: boolean;
  time: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string;
  children?: NavItem[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  enrolled: number;
  completions: number;
  mandatory: boolean;
}

export interface Survey {
  id: string;
  title: string;
  responses: number;
  sentiment: number;
  status: 'Draft' | 'Active' | 'Closed';
  closesOn: string;
}
