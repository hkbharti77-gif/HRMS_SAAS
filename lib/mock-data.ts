import type {
  Tenant, Employee, Department, LeaveRequest, AttendanceRecord, Payslip,
  JobPosting, Candidate, Ticket, ExpenseClaim, Asset, Goal, Notification,
  Course, Survey,
} from './types';

export const tenants: Tenant[] = [
  { id: 't1', name: 'Acme Corp', domain: 'acme', primaryColor: '#2563eb', industry: 'Technology', size: '201-500', plan: 'Pro', status: 'active', employeeCount: 342, adminEmail: 'admin@acme.com', adminName: 'Sarah Chen', createdAt: '2023-03-15', mrr: 2400, country: 'United States', city: 'San Francisco' },
  { id: 't2', name: 'Globex Inc', domain: 'globex', primaryColor: '#0d9488', industry: 'Manufacturing', size: '51-200', plan: 'Growth', status: 'active', employeeCount: 128, adminEmail: 'hr@globex.com', adminName: 'Marcus Lee', createdAt: '2023-07-22', mrr: 900, country: 'Germany', city: 'Berlin' },
  { id: 't3', name: 'Initech', domain: 'initech', primaryColor: '#7c3aed', industry: 'Finance', size: '51-200', plan: 'Growth', status: 'trial', employeeCount: 67, adminEmail: 'ops@initech.com', adminName: 'Diana Prince', createdAt: '2024-01-10', mrr: 0, country: 'United Kingdom', city: 'London' },
  { id: 't4', name: 'Umbrella Co', domain: 'umbrella', primaryColor: '#dc2626', industry: 'Healthcare', size: '201-500', plan: 'Pro', status: 'active', employeeCount: 287, adminEmail: 'admin@umbrella.com', adminName: 'James Wilson', createdAt: '2022-11-05', mrr: 2100, country: 'Canada', city: 'Toronto' },
  { id: 't5', name: 'Stark Industries', domain: 'stark', primaryColor: '#f59e0b', industry: 'Engineering', size: '501-1000', plan: 'Enterprise', status: 'active', employeeCount: 845, adminEmail: 'pepper@stark.com', adminName: 'Pepper Potts', createdAt: '2021-06-18', mrr: 6800, country: 'United States', city: 'New York' },
  { id: 't6', name: 'Wayne Enterprises', domain: 'wayne', primaryColor: '#1e293b', industry: 'Conglomerate', size: '501-1000', plan: 'Enterprise', status: 'active', employeeCount: 612, adminEmail: 'hr@wayne.com', adminName: 'Alfred Pennyworth', createdAt: '2022-02-28', mrr: 5200, country: 'United States', city: 'Gotham' },
  { id: 't7', name: 'Soylent Corp', domain: 'soylent', primaryColor: '#16a34a', industry: 'Food & Beverage', size: '11-50', plan: 'Starter', status: 'suspended', employeeCount: 34, adminEmail: 'admin@soylent.com', adminName: 'Robert Smith', createdAt: '2024-03-01', mrr: 0, country: 'Australia', city: 'Sydney' },
  { id: 't8', name: 'Cyberdyne Systems', domain: 'cyberdyne', primaryColor: '#0891b2', industry: 'Robotics', size: '201-500', plan: 'Pro', status: 'active', employeeCount: 198, adminEmail: 'hr@cyberdyne.com', adminName: 'Miles Dyson', createdAt: '2023-09-12', mrr: 1500, country: 'Japan', city: 'Tokyo' },
  { id: 't9', name: 'Hooli', domain: 'hooli', primaryColor: '#6366f1', industry: 'Technology', size: '501-1000', plan: 'Enterprise', status: 'trial', employeeCount: 540, adminEmail: 'admin@hooli.com', adminName: 'Gavin Belson', createdAt: '2024-05-20', mrr: 0, country: 'United States', city: 'Palo Alto' },
  { id: 't10', name: 'Pied Piper', domain: 'piedpiper', primaryColor: '#ea580c', industry: 'Technology', size: '11-50', plan: 'Starter', status: 'active', employeeCount: 18, adminEmail: 'richard@piedpiper.com', adminName: 'Richard Hendricks', createdAt: '2024-06-08', mrr: 120, country: 'United States', city: 'San Francisco' },
];

const firstNames = ['Sarah', 'David', 'Priya', 'Alex', 'Emily', 'Marcus', 'Diana', 'James', 'Lisa', 'Omar', 'Nina', 'Carlos', 'Yuki', 'Anna', 'Raj', 'Sophie', 'Liam', 'Mei', 'Noah', 'Zara'];
const lastNames = ['Chen', 'Kim', 'Sharma', 'Turner', 'Johnson', 'Lee', 'Prince', 'Wilson', 'Müller', 'Hassan', 'Rossi', 'Santos', 'Tanaka', 'Schmidt', 'Patel', 'Dubois', 'O\'Brien', 'Wang', 'Anderson', 'Khan'];
const depts = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Customer Success'];
const desigNames = ['Software Engineer', 'Senior Engineer', 'Engineering Manager', 'Product Manager', 'Senior PM', 'Designer', 'Senior Designer', 'Marketing Lead', 'Account Executive', 'HR Manager', 'Finance Analyst', 'Ops Specialist'];
const locations = ['San Francisco', 'New York', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto'];
const statuses = ['active', 'active', 'active', 'active', 'on-leave', 'remote', 'probation', 'notice'] as const;
const types = ['Full-time', 'Full-time', 'Full-time', 'Part-time', 'Contract', 'Intern'] as const;

export const employees: Employee[] = Array.from({ length: 48 }).map((_, i) => {
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[i % lastNames.length];
  const dept = depts[i % depts.length];
  const risk = (['Low', 'Low', 'Low', 'Medium', 'Medium', 'High'] as const)[i % 6];
  return {
    id: `e${i + 1}`,
    empCode: `EMP${String(1001 + i)}`,
    firstName: fn,
    lastName: ln,
    email: `${fn.toLowerCase()}.${ln.toLowerCase().replace(/[^a-z]/g, '')}@acme.com`,
    phone: `+1 555-${String(1000 + i).slice(-4)}`,
    department: dept,
    designation: desigNames[i % desigNames.length],
    location: locations[i % locations.length],
    manager: i % 5 === 0 ? undefined : `${firstNames[(i + 3) % firstNames.length]} ${lastNames[(i + 3) % lastNames.length]}`,
    status: statuses[i % statuses.length],
    employmentType: types[i % types.length],
    joinDate: `202${i % 4}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    dob: `199${i % 9}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    gender: i % 2 === 0 ? 'Female' : 'Male',
    salary: 45000 + (i % 10) * 12000,
    attritionRisk: risk,
    leaveBalance: { casual: 12 - (i % 7), sick: 12 - (i % 5), earned: 18 - (i % 9) },
    skills: ['React', 'TypeScript', 'Leadership', 'Communication', 'SQL'].slice(0, (i % 3) + 2),
  };
});

export const departments: Department[] = [
  { id: 'd1', name: 'Engineering', head: 'Sarah Chen', headcount: 42, description: 'Builds and maintains our products' },
  { id: 'd2', name: 'Product', head: 'David Kim', headcount: 12, description: 'Defines product strategy and roadmap' },
  { id: 'd3', name: 'Design', head: 'Priya Sharma', headcount: 8, description: 'Crafts user experience and visual design' },
  { id: 'd4', name: 'Marketing', head: 'Alex Turner', headcount: 15, description: 'Brand, content, and demand generation' },
  { id: 'd5', name: 'Sales', head: 'Emily Johnson', headcount: 22, description: 'Revenue and customer acquisition' },
  { id: 'd6', name: 'HR', head: 'Marcus Lee', headcount: 6, description: 'People operations and culture' },
  { id: 'd7', name: 'Finance', head: 'Diana Prince', headcount: 9, description: 'Accounting, payroll, and financial planning' },
  { id: 'd8', name: 'Operations', head: 'James Wilson', headcount: 11, description: 'Keeps the company running smoothly' },
  { id: 'd9', name: 'Customer Success', head: 'Lisa Müller', headcount: 17, description: 'Onboarding, support, and retention' },
];

export const designations: { id: string; title: string; department: string; level: string }[] = [
  { id: 'dg1', title: 'Software Engineer', department: 'Engineering', level: 'L3' },
  { id: 'dg2', title: 'Senior Software Engineer', department: 'Engineering', level: 'L4' },
  { id: 'dg3', title: 'Staff Engineer', department: 'Engineering', level: 'L5' },
  { id: 'dg4', title: 'Engineering Manager', department: 'Engineering', level: 'M1' },
  { id: 'dg5', title: 'Product Manager', department: 'Product', level: 'L4' },
  { id: 'dg6', title: 'Senior Product Manager', department: 'Product', level: 'L5' },
  { id: 'dg7', title: 'Product Designer', department: 'Design', level: 'L3' },
  { id: 'dg8', title: 'Senior Designer', department: 'Design', level: 'L4' },
  { id: 'dg9', title: 'Marketing Manager', department: 'Marketing', level: 'M1' },
  { id: 'dg10', title: 'Account Executive', department: 'Sales', level: 'L3' },
  { id: 'dg11', title: 'HR Manager', department: 'HR', level: 'M1' },
  { id: 'dg12', title: 'Finance Analyst', department: 'Finance', level: 'L3' },
];

export const officeLocations = [
  { id: 'l1', name: 'San Francisco HQ', address: '535 Mission St, San Francisco, CA 94105', country: 'United States', employees: 142, timezone: 'PST' },
  { id: 'l2', name: 'New York Office', address: '350 Fifth Ave, New York, NY 10118', country: 'United States', employees: 86, timezone: 'EST' },
  { id: 'l3', name: 'London Office', address: '1 Finsbury Avenue, London EC2M 2PF', country: 'United Kingdom', employees: 54, timezone: 'GMT' },
  { id: 'l4', name: 'Berlin Office', address: 'Friedrichstraße 68, 10117 Berlin', country: 'Germany', employees: 38, timezone: 'CET' },
  { id: 'l5', name: 'Tokyo Office', address: '1-9-2 Marunouchi, Chiyoda City, Tokyo', country: 'Japan', employees: 22, timezone: 'JST' },
];

export const holidays = [
  { id: 'h1', name: 'New Year\'s Day', date: '2025-01-01', day: 'Wednesday', location: 'All Locations', type: 'Public' },
  { id: 'h2', name: 'Martin Luther King Jr. Day', date: '2025-01-20', day: 'Monday', location: 'US Offices', type: 'Public' },
  { id: 'h3', name: 'Memorial Day', date: '2025-05-26', day: 'Monday', location: 'US Offices', type: 'Public' },
  { id: 'h4', name: 'Independence Day', date: '2025-07-04', day: 'Friday', location: 'US Offices', type: 'Public' },
  { id: 'h5', name: 'Labor Day', date: '2025-09-01', day: 'Monday', location: 'US Offices', type: 'Public' },
  { id: 'h6', name: 'Thanksgiving', date: '2025-11-27', day: 'Thursday', location: 'US Offices', type: 'Public' },
  { id: 'h7', name: 'Christmas Day', date: '2025-12-25', day: 'Thursday', location: 'All Locations', type: 'Public' },
  { id: 'h8', name: 'Company Foundation Day', date: '2025-03-15', day: 'Saturday', location: 'All Locations', type: 'Company' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 'lr1', employeeName: 'Sarah Chen', employeeId: 'e1', type: 'Casual', from: '2025-08-04', to: '2025-08-05', days: 2, reason: 'Family function out of town', status: 'Pending', appliedOn: '2025-07-28' },
  { id: 'lr2', employeeName: 'David Kim', employeeId: 'e2', type: 'Sick', from: '2025-07-30', to: '2025-07-30', days: 1, reason: 'Fever and cold', status: 'Pending', appliedOn: '2025-07-30' },
  { id: 'lr3', employeeName: 'Priya Sharma', employeeId: 'e3', type: 'Earned', from: '2025-08-10', to: '2025-08-14', days: 5, reason: 'Vacation with family', status: 'Pending', appliedOn: '2025-07-25' },
  { id: 'lr4', employeeName: 'Alex Turner', employeeId: 'e4', type: 'Casual', from: '2025-07-31', to: '2025-07-31', days: 1, reason: 'Personal work', status: 'Approved', appliedOn: '2025-07-20', approver: 'Marcus Lee' },
  { id: 'lr5', employeeName: 'Emily Johnson', employeeId: 'e5', type: 'Unpaid', from: '2025-09-01', to: '2025-09-10', days: 10, reason: 'Extended personal break', status: 'Pending', appliedOn: '2025-07-29' },
  { id: 'lr6', employeeName: 'James Wilson', employeeId: 'e8', type: 'Sick', from: '2025-07-28', to: '2025-07-29', days: 2, reason: 'Medical procedure', status: 'Approved', appliedOn: '2025-07-26', approver: 'Sarah Chen' },
  { id: 'lr7', employeeName: 'Lisa Müller', employeeId: 'e9', type: 'Casual', from: '2025-08-15', to: '2025-08-15', days: 1, reason: 'Moving apartments', status: 'Rejected', appliedOn: '2025-07-22', approver: 'Marcus Lee' },
  { id: 'lr8', employeeName: 'Omar Hassan', employeeId: 'e10', type: 'Earned', from: '2025-08-20', to: '2025-08-25', days: 6, reason: 'Trip to Morocco', status: 'Pending', appliedOn: '2025-07-30' },
];

export const attendance: AttendanceRecord[] = Array.from({ length: 20 }).map((_, i) => {
  const e = employees[i];
  const statuses = ['Present', 'Present', 'Present', 'WFH', 'Late', 'Present'] as const;
  const st = statuses[i % statuses.length];
  const inTime = st === 'Late' ? '10:15 AM' : '09:0' + (i % 8) + ' AM';
  const outTime = '06:0' + (i % 9) + ' PM';
  return {
    id: `a${i + 1}`,
    employeeName: `${e.firstName} ${e.lastName}`,
    employeeId: e.id,
    date: `2025-07-${String(31 - (i % 5)).padStart(2, '0')}`,
    punchIn: inTime,
    punchOut: outTime,
    hours: 8 + (i % 2) - (st === 'Late' ? 0.25 : 0),
    status: st,
    location: e.location,
  };
});

export const payslips: Payslip[] = employees.slice(0, 24).map((e, i) => ({
  id: `ps${i + 1}`,
  employeeName: `${e.firstName} ${e.lastName}`,
  employeeId: e.id,
  month: 'July 2025',
  gross: e.salary / 12,
  deductions: (e.salary / 12) * 0.22,
  net: (e.salary / 12) * 0.78,
  status: i % 3 === 0 ? 'Pending' : i % 5 === 0 ? 'Disbursed' : 'Generated',
}));

export const jobPostings: JobPosting[] = [
  { id: 'j1', title: 'Senior Frontend Engineer', department: 'Engineering', location: 'San Francisco', type: 'Full-time', applicants: 47, stage: 'Open', postedOn: '2025-07-01' },
  { id: 'j2', title: 'Product Manager', department: 'Product', location: 'Remote', type: 'Full-time', applicants: 89, stage: 'Open', postedOn: '2025-06-20' },
  { id: 'j3', title: 'UX Designer', department: 'Design', location: 'New York', type: 'Full-time', applicants: 34, stage: 'Open', postedOn: '2025-07-15' },
  { id: 'j4', title: 'Account Executive', department: 'Sales', location: 'London', type: 'Full-time', applicants: 22, stage: 'On Hold', postedOn: '2025-05-10' },
  { id: 'j5', title: 'Data Analyst', department: 'Finance', location: 'Remote', type: 'Contract', applicants: 56, stage: 'Open', postedOn: '2025-07-08' },
  { id: 'j6', title: 'DevOps Engineer', department: 'Engineering', location: 'Berlin', type: 'Full-time', applicants: 31, stage: 'Closed', postedOn: '2025-04-22' },
];

export const candidates: Candidate[] = [
  { id: 'c1', name: 'Michael Scott', email: 'm.scott@email.com', role: 'Senior Frontend Engineer', stage: 'Applied', rating: 4, matchScore: 87, appliedOn: '2025-07-25', source: 'LinkedIn' },
  { id: 'c2', name: 'Pam Beesly', email: 'p.beesly@email.com', role: 'UX Designer', stage: 'Screening', rating: 5, matchScore: 94, appliedOn: '2025-07-22', source: 'Referral' },
  { id: 'c3', name: 'Jim Halpert', email: 'j.halpert@email.com', role: 'Product Manager', stage: 'Interview', rating: 4, matchScore: 81, appliedOn: '2025-07-18', source: 'Company Website' },
  { id: 'c4', name: 'Dwight Schrute', email: 'd.schrute@email.com', role: 'Account Executive', stage: 'Offer', rating: 3, matchScore: 72, appliedOn: '2025-07-10', source: 'Indeed' },
  { id: 'c5', name: 'Angela Martin', email: 'a.martin@email.com', role: 'Data Analyst', stage: 'Applied', rating: 4, matchScore: 88, appliedOn: '2025-07-28', source: 'LinkedIn' },
  { id: 'c6', name: 'Kevin Malone', email: 'k.malone@email.com', role: 'DevOps Engineer', stage: 'Screening', rating: 3, matchScore: 65, appliedOn: '2025-07-20', source: 'AngelList' },
  { id: 'c7', name: 'Stanley Hudson', email: 's.hudson@email.com', role: 'Senior Frontend Engineer', stage: 'Interview', rating: 5, matchScore: 91, appliedOn: '2025-07-15', source: 'Referral' },
  { id: 'c8', name: 'Phyllis Vance', email: 'p.vance@email.com', role: 'UX Designer', stage: 'Applied', rating: 4, matchScore: 79, appliedOn: '2025-07-26', source: 'Dribbble' },
  { id: 'c9', name: 'Oscar Martinez', email: 'o.martinez@email.com', role: 'Product Manager', stage: 'Hired', rating: 5, matchScore: 96, appliedOn: '2025-06-28', source: 'LinkedIn' },
  { id: 'c10', name: 'Creed Bratton', email: 'c.bratton@email.com', role: 'Account Executive', stage: 'Rejected', rating: 2, matchScore: 45, appliedOn: '2025-07-05', source: 'Indeed' },
];

export const tickets: Ticket[] = [
  { id: 'tk1', subject: 'Cannot access payslip for June', category: 'Payroll', priority: 'High', status: 'Open', raisedBy: 'Sarah Chen', assignedTo: 'HR Support', createdAt: '2025-07-29' },
  { id: 'tk2', subject: 'Laptop screen flickering', category: 'IT Hardware', priority: 'Medium', status: 'In Progress', raisedBy: 'David Kim', assignedTo: 'IT Team', createdAt: '2025-07-28' },
  { id: 'tk3', subject: 'Leave balance seems incorrect', category: 'Leave', priority: 'Medium', status: 'Open', raisedBy: 'Priya Sharma', createdAt: '2025-07-27' },
  { id: 'tk4', subject: 'Request for ergonomic chair', category: 'Facilities', priority: 'Low', status: 'Resolved', raisedBy: 'Alex Turner', assignedTo: 'Facilities', createdAt: '2025-07-20' },
  { id: 'tk5', subject: 'Email signature not updating', category: 'IT Software', priority: 'Low', status: 'Closed', raisedBy: 'Emily Johnson', assignedTo: 'IT Team', createdAt: '2025-07-18' },
  { id: 'tk6', subject: 'Reimbursement delayed for 2 weeks', category: 'Finance', priority: 'Urgent', status: 'Open', raisedBy: 'James Wilson', assignedTo: 'Finance Team', createdAt: '2025-07-30' },
  { id: 'tk7', subject: 'Add me to the Engineering channel', category: 'IT Software', priority: 'Low', status: 'In Progress', raisedBy: 'Lisa Müller', assignedTo: 'IT Team', createdAt: '2025-07-26' },
];

export const expenseClaims: ExpenseClaim[] = [
  { id: 'ex1', employeeName: 'Sarah Chen', category: 'Travel', amount: 1240, date: '2025-07-22', status: 'Pending', description: 'Client visit to NYC — flights and hotel' },
  { id: 'ex2', employeeName: 'David Kim', category: 'Meals', amount: 85, date: '2025-07-25', status: 'Approved', description: 'Team lunch with vendors' },
  { id: 'ex3', employeeName: 'Priya Sharma', category: 'Software', amount: 320, date: '2025-07-20', status: 'Pending', description: 'Figma annual subscription' },
  { id: 'ex4', employeeName: 'Alex Turner', category: 'Travel', amount: 680, date: '2025-07-18', status: 'Reimbursed', description: 'Conference attendance — flights' },
  { id: 'ex5', employeeName: 'Emily Johnson', category: 'Office Supplies', amount: 145, date: '2025-07-15', status: 'Pending', description: 'Whiteboards and markers for sales floor' },
  { id: 'ex6', employeeName: 'James Wilson', category: 'Training', amount: 950, date: '2025-07-12', status: 'Rejected', description: 'Certification course (out of policy)' },
  { id: 'ex7', employeeName: 'Lisa Müller', category: 'Meals', amount: 62, date: '2025-07-28', status: 'Approved', description: 'Client dinner' },
];

export const assets: Asset[] = [
  { id: 'as1', name: 'MacBook Pro 16"', type: 'Laptop', serial: 'MBP2024-001', status: 'Assigned', assignedTo: 'Sarah Chen', assignedOn: '2024-01-15', value: 2799 },
  { id: 'as2', name: 'Dell Monitor 27"', type: 'Monitor', serial: 'DEL27-102', status: 'Assigned', assignedTo: 'David Kim', assignedOn: '2024-03-20', value: 450 },
  { id: 'as3', name: 'iPhone 15 Pro', type: 'Phone', serial: 'IP15P-205', status: 'Assigned', assignedTo: 'Emily Johnson', assignedOn: '2024-02-10', value: 1099 },
  { id: 'as4', name: 'MacBook Air 13"', type: 'Laptop', serial: 'MBA2024-008', status: 'Available', value: 1299 },
  { id: 'as5', name: 'Logitech MX Master 3S', type: 'Accessory', serial: 'LOG-MX-501', status: 'Available', value: 99 },
  { id: 'as6', name: 'Dell XPS 15"', type: 'Laptop', serial: 'XPS15-310', status: 'Under Repair', value: 1899 },
  { id: 'as7', name: 'iPad Pro 12.9"', type: 'Tablet', serial: 'IPP12-415', status: 'Assigned', assignedTo: 'Priya Sharma', assignedOn: '2024-04-05', value: 1299 },
  { id: 'as8', name: 'Samsung 4K Display', type: 'Monitor', serial: 'SAM4K-520', status: 'Retired', value: 380 },
];

export const goals: Goal[] = [
  { id: 'g1', title: 'Increase ARR by 40%', owner: 'Company', ownerType: 'Company', progress: 62, dueDate: '2025-12-31', status: 'On Track', keyResults: [{ id: 'kr1', title: 'Close $4M in new deals', done: false }, { id: 'kr2', title: 'Expand to 3 new geos', done: false }, { id: 'kr3', title: 'Launch enterprise tier', done: true }] },
  { id: 'g2', title: 'Ship v2.0 of core product', owner: 'Engineering', ownerType: 'Team', progress: 78, dueDate: '2025-09-30', status: 'On Track', keyResults: [{ id: 'kr4', title: 'Complete API migration', done: true }, { id: 'kr5', title: 'New dashboard redesign', done: false }, { id: 'kr6', title: 'Performance audit', done: false }] },
  { id: 'g3', title: 'Improve CSAT to 4.5+', owner: 'Customer Success', ownerType: 'Team', progress: 45, dueDate: '2025-10-15', status: 'At Risk', keyResults: [{ id: 'kr7', title: 'Reduce avg response to <2h', done: false }, { id: 'kr8', title: 'Launch self-service KB', done: true }] },
  { id: 'g4', title: 'Reduce attrition below 10%', owner: 'HR', ownerType: 'Team', progress: 30, dueDate: '2025-12-31', status: 'Behind', keyResults: [{ id: 'kr9', title: 'Launch engagement program', done: false }, { id: 'kr10', title: 'Quarterly pulse surveys', done: true }] },
  { id: 'g5', title: 'Complete React certification', owner: 'Alex Turner', ownerType: 'Individual', progress: 80, dueDate: '2025-08-30', status: 'On Track', keyResults: [{ id: 'kr11', title: 'Finish 3 modules', done: true }, { id: 'kr12', title: 'Pass final exam', done: false }] },
  { id: 'g6', title: 'Hire 12 engineers', owner: 'Engineering', ownerType: 'Team', progress: 58, dueDate: '2025-09-30', status: 'On Track', keyResults: [{ id: 'kr13', title: '7 offers accepted', done: false }, { id: 'kr14', title: 'Reduce time-to-hire to 30 days', done: false }] },
];

export const courses: Course[] = [
  { id: 'co1', title: 'Effective Communication at Work', category: 'Soft Skills', duration: '3 hours', enrolled: 142, completions: 98, mandatory: false },
  { id: 'co2', title: 'Workplace Harassment Prevention', category: 'Compliance', duration: '1 hour', enrolled: 342, completions: 320, mandatory: true },
  { id: 'co3', title: 'Leadership Essentials', category: 'Leadership', duration: '6 hours', enrolled: 28, completions: 15, mandatory: false },
  { id: 'co4', title: 'Data Privacy & Security', category: 'Compliance', duration: '2 hours', enrolled: 342, completions: 289, mandatory: true },
  { id: 'co5', title: 'Advanced Excel for Finance', category: 'Technical', duration: '4 hours', enrolled: 45, completions: 30, mandatory: false },
  { id: 'co6', title: 'Customer First Mindset', category: 'Soft Skills', duration: '2 hours', enrolled: 67, completions: 54, mandatory: false },
];

export const surveys: Survey[] = [
  { id: 's1', title: 'Q3 Employee Pulse Check', responses: 287, sentiment: 78, status: 'Active', closesOn: '2025-08-10' },
  { id: 's2', title: 'Remote Work Satisfaction', responses: 312, sentiment: 84, status: 'Closed', closesOn: '2025-06-30' },
  { id: 's3', title: 'Manager Effectiveness Survey', responses: 0, sentiment: 0, status: 'Draft', closesOn: '2025-08-20' },
  { id: 's4', title: 'Onboarding Experience Q2', responses: 24, sentiment: 91, status: 'Closed', closesOn: '2025-05-15' },
];

export const notifications: Notification[] = [
  { id: 'n1', title: 'Leave request needs approval', description: 'Sarah Chen requested 2 days casual leave', type: 'leave', read: false, time: '2025-07-30T09:15:00' },
  { id: 'n2', title: 'Expense claim submitted', description: 'David Kim submitted a $85 meal expense', type: 'expense', read: false, time: '2025-07-30T08:42:00' },
  { id: 'n3', title: 'Payroll run scheduled', description: 'July payroll cycle starts in 2 days', type: 'payroll', read: false, time: '2025-07-29T16:20:00' },
  { id: 'n4', title: 'New support ticket', description: 'James Wilson raised an urgent ticket', type: 'ticket', read: true, time: '2025-07-29T14:05:00' },
  { id: 'n5', title: 'New candidate applied', description: 'Angela Martin applied for Data Analyst', type: 'hiring', read: true, time: '2025-07-28T11:30:00' },
  { id: 'n6', title: 'System maintenance', description: 'Scheduled downtime on Aug 3, 2-4 AM', type: 'system', read: true, time: '2025-07-28T09:00:00' },
];

export const announcements = [
  { id: 'an1', title: 'Company All-Hands — August Edition', content: 'Join us on August 8th at 10 AM PST for our quarterly all-hands meeting. We\'ll cover Q2 results, product roadmap, and team shoutouts.', author: 'Sarah Chen', date: '2025-07-28', pinned: true, category: 'Company' },
  { id: 'an2', title: 'New Wellness Program Launching', content: 'Starting August 1st, employees can claim up to $50/month for gym memberships, yoga classes, or meditation apps through the wellness benefit.', author: 'HR Team', date: '2025-07-25', pinned: false, category: 'HR' },
  { id: 'an3', title: 'Office Renovation — SF HQ', content: 'The 3rd floor will be under renovation from Aug 5-16. Temporary seating arrangements have been shared. Please coordinate with your manager for WFH options during this period.', author: 'Facilities', date: '2025-07-22', pinned: false, category: 'Facilities' },
];

export const auditLogs = [
  { id: 'al1', actor: 'admin@acme.com', action: 'Updated leave policy', target: 'Leave Settings', ip: '203.0.113.45', time: '2025-07-30T10:22:00' },
  { id: 'al2', actor: 'sarah.chen@acme.com', action: 'Approved leave request', target: 'LR-2025-0042', ip: '203.0.113.12', time: '2025-07-30T09:15:00' },
  { id: 'al3', actor: 'admin@acme.com', action: 'Added new employee', target: 'EMP1049 — Nina Rossi', ip: '203.0.113.45', time: '2025-07-29T16:40:00' },
  { id: 'al4', actor: 'system', action: 'Payroll cycle initiated', target: 'July 2025', ip: 'internal', time: '2025-07-29T14:00:00' },
  { id: 'al5', actor: 'david.kim@acme.com', action: 'Submitted expense claim', target: 'EX-2025-0156', ip: '203.0.113.78', time: '2025-07-29T11:30:00' },
  { id: 'al6', actor: 'admin@acme.com', action: 'Updated role permissions', target: 'Manager role', ip: '203.0.113.45', time: '2025-07-28T15:20:00' },
  { id: 'al7', actor: 'marcus.lee@acme.com', action: 'Rejected leave request', target: 'LR-2025-0039', ip: '203.0.113.33', time: '2025-07-28T13:45:00' },
];

// Charts data
export const headcountTrend = [
  { month: 'Jan', value: 298 }, { month: 'Feb', value: 305 }, { month: 'Mar', value: 312 },
  { month: 'Apr', value: 318 }, { month: 'May', value: 325 }, { month: 'Jun', value: 331 },
  { month: 'Jul', value: 342 },
];

export const attritionTrend = [
  { month: 'Jan', value: 8.2 }, { month: 'Feb', value: 9.1 }, { month: 'Mar', value: 7.8 },
  { month: 'Apr', value: 10.2 }, { month: 'May', value: 9.5 }, { month: 'Jun', value: 8.9 },
  { month: 'Jul', value: 9.2 },
];

export const attendanceTrend = [
  { day: 'Mon', present: 312, absent: 18, wfh: 12 },
  { day: 'Tue', present: 318, absent: 14, wfh: 10 },
  { day: 'Wed', present: 305, absent: 22, wfh: 15 },
  { day: 'Thu', present: 320, absent: 12, wfh: 10 },
  { day: 'Fri', present: 298, absent: 20, wfh: 24 },
];

export const departmentDist = [
  { name: 'Engineering', value: 42, fill: '#2563eb' },
  { name: 'Sales', value: 22, fill: '#0d9488' },
  { name: 'CS', value: 17, fill: '#f59e0b' },
  { name: 'Marketing', value: 15, fill: '#ea580c' },
  { name: 'Product', value: 12, fill: '#7c3aed' },
  { name: 'Other', value: 44, fill: '#64748b' },
];

export const hiringFunnel = [
  { stage: 'Applied', value: 279 },
  { stage: 'Screening', value: 124 },
  { stage: 'Interview', value: 56 },
  { stage: 'Offer', value: 18 },
  { stage: 'Hired', value: 12 },
];

export const payrollCostTrend = [
  { month: 'Feb', value: 1.82 }, { month: 'Mar', value: 1.88 }, { month: 'Apr', value: 1.91 },
  { month: 'May', value: 1.95 }, { month: 'Jun', value: 2.01 }, { month: 'Jul', value: 2.08 },
];

// ---- Super Admin platform data ----
export const mrrTrend = [
  { month: 'Jan', value: 142 }, { month: 'Feb', value: 148 }, { month: 'Mar', value: 155 },
  { month: 'Apr', value: 162 }, { month: 'May', value: 169 }, { month: 'Jun', value: 176 },
  { month: 'Jul', value: 184 },
];

export const signupTrend = [
  { month: 'Jan', value: 32 }, { month: 'Feb', value: 28 }, { month: 'Mar', value: 41 },
  { month: 'Apr', value: 35 }, { month: 'May', value: 48 }, { month: 'Jun', value: 52 },
  { month: 'Jul', value: 61 },
];

export const planDist = [
  { name: 'Starter', value: 842, fill: '#94a3b8' },
  { name: 'Growth', value: 986, fill: '#2563eb' },
  { name: 'Pro', value: 412, fill: '#0d9488' },
  { name: 'Enterprise', value: 178, fill: '#f59e0b' },
];

export const platformInvoices = [
  { id: 'inv1', tenant: 'Stark Industries', amount: 6800, date: '2025-07-01', status: 'Paid', plan: 'Enterprise' },
  { id: 'inv2', tenant: 'Wayne Enterprises', amount: 5200, date: '2025-07-01', status: 'Paid', plan: 'Enterprise' },
  { id: 'inv3', tenant: 'Acme Corp', amount: 2400, date: '2025-07-01', status: 'Paid', plan: 'Pro' },
  { id: 'inv4', tenant: 'Umbrella Co', amount: 2100, date: '2025-07-01', status: 'Pending', plan: 'Pro' },
  { id: 'inv5', tenant: 'Cyberdyne Systems', amount: 1500, date: '2025-07-01', status: 'Paid', plan: 'Pro' },
  { id: 'inv6', tenant: 'Globex Inc', amount: 900, date: '2025-07-01', status: 'Paid', plan: 'Growth' },
  { id: 'inv7', tenant: 'Pied Piper', amount: 120, date: '2025-07-01', status: 'Failed', plan: 'Starter' },
  { id: 'inv8', tenant: 'Hooli', amount: 0, date: '2025-07-01', status: 'Trial', plan: 'Enterprise' },
];

export const platformPlans = [
  { id: 'pl1', name: 'Starter', price: 0, perUnit: 'flat', employees: 'Up to 10', features: ['Core HR', 'Directory', 'Leave management', 'Self-service portal', 'Mobile app'], tenants: 842, status: 'Active' },
  { id: 'pl2', name: 'Growth', price: 5, perUnit: '/employee/mo', employees: '10-200', features: ['Everything in Starter', 'Payroll & compliance', 'Performance reviews', 'AI HR Assistant', 'Expenses', 'Helpdesk'], tenants: 986, status: 'Active' },
  { id: 'pl3', name: 'Pro', price: 9, perUnit: '/employee/mo', employees: '200-1000', features: ['Everything in Growth', 'Hiring & ATS', 'Advanced analytics', 'Custom roles', 'Approval workflows', 'Priority support'], tenants: 412, status: 'Active' },
  { id: 'pl4', name: 'Enterprise', price: 15, perUnit: '/employee/mo', employees: '1000+', features: ['Everything in Pro', 'SSO & SAML', 'Dedicated CSM', 'Custom integrations', 'SLA guarantee', 'Audit logs export'], tenants: 178, status: 'Active' },
];

export const featureFlags = [
  { id: 'ff1', feature: 'AI HR Assistant', plans: ['Growth', 'Pro', 'Enterprise'], tenants: 1576, enabled: true, category: 'AI' },
  { id: 'ff2', feature: 'AI Resume Screening', plans: ['Pro', 'Enterprise'], tenants: 590, enabled: true, category: 'AI' },
  { id: 'ff3', feature: 'AI Attrition Risk', plans: ['Pro', 'Enterprise'], tenants: 590, enabled: true, category: 'AI' },
  { id: 'ff4', feature: 'Payroll Module', plans: ['Growth', 'Pro', 'Enterprise'], tenants: 1576, enabled: true, category: 'Core' },
  { id: 'ff5', feature: 'Hiring / ATS', plans: ['Pro', 'Enterprise'], tenants: 590, enabled: true, category: 'Core' },
  { id: 'ff6', feature: 'Advanced Analytics', plans: ['Pro', 'Enterprise'], tenants: 590, enabled: true, category: 'Core' },
  { id: 'ff7', feature: 'Custom Roles', plans: ['Pro', 'Enterprise'], tenants: 590, enabled: false, category: 'Core' },
  { id: 'ff8', feature: 'SSO / SAML', plans: ['Enterprise'], tenants: 178, enabled: true, category: 'Security' },
  { id: 'ff9', feature: 'Audit Log Export', plans: ['Enterprise'], tenants: 178, enabled: true, category: 'Security' },
  { id: 'ff10', feature: 'Multi-language UI', plans: ['Pro', 'Enterprise'], tenants: 590, enabled: false, category: 'Core' },
];

export const platformTickets = [
  { id: 'pt1', tenant: 'Acme Corp', subject: 'Payslip export failing for batch', priority: 'High', status: 'Open', assignee: 'Support Team A', createdAt: '2025-07-30', sla: '2h remaining' },
  { id: 'pt2', tenant: 'Globex Inc', subject: 'How to configure leave carry-forward?', priority: 'Low', status: 'Resolved', assignee: 'Support Team B', createdAt: '2025-07-28', sla: 'Met' },
  { id: 'pt3', tenant: 'Hooli', subject: 'SSO integration with Okta', priority: 'Urgent', status: 'In Progress', assignee: 'Engineering', createdAt: '2025-07-29', sla: '1h remaining' },
  { id: 'pt4', tenant: 'Wayne Enterprises', subject: 'Bulk employee import template', priority: 'Medium', status: 'Open', assignee: 'Unassigned', createdAt: '2025-07-30', sla: '4h remaining' },
  { id: 'pt5', tenant: 'Cyberdyne Systems', subject: 'Payroll tax config for Japan', priority: 'High', status: 'In Progress', assignee: 'Support Team A', createdAt: '2025-07-27', sla: 'Overdue' },
  { id: 'pt6', tenant: 'Stark Industries', subject: 'Request for custom report', priority: 'Medium', status: 'Resolved', assignee: 'Support Team B', createdAt: '2025-07-25', sla: 'Met' },
  { id: 'pt7', tenant: 'Pied Piper', subject: 'Upgrade from Starter to Growth', priority: 'Low', status: 'Closed', assignee: 'Sales', createdAt: '2025-07-22', sla: 'Met' },
];

export const moduleAdoption = [
  { module: 'Core HR', tenants: 2418, pct: 100 },
  { module: 'Leave', tenants: 2410, pct: 99.7 },
  { module: 'Attendance', tenants: 2380, pct: 98.4 },
  { module: 'Payroll', tenants: 1576, pct: 65.2 },
  { module: 'Performance', tenants: 1420, pct: 58.7 },
  { module: 'Hiring/ATS', tenants: 590, pct: 24.4 },
  { module: 'Expenses', tenants: 1560, pct: 64.5 },
  { module: 'Helpdesk', tenants: 1490, pct: 61.6 },
  { module: 'Learning', tenants: 980, pct: 40.5 },
  { module: 'Engagement', tenants: 1120, pct: 46.3 },
];

export const platformAuditLogs = [
  { id: 'pal1', actor: 'platform@peoplepilot.com', action: 'Suspended tenant', target: 'Soylent Corp', ip: '10.0.0.1', time: '2025-07-30T11:00:00' },
  { id: 'pal2', actor: 'platform@peoplepilot.com', action: 'Upgraded plan', target: 'Hooli → Enterprise trial', ip: '10.0.0.1', time: '2025-07-30T09:30:00' },
  { id: 'pal3', actor: 'system', action: 'Payment failed', target: 'Pied Piper — $120', ip: 'internal', time: '2025-07-29T22:15:00' },
  { id: 'pal4', actor: 'platform@peoplepilot.com', action: 'Created tenant', target: 'Hooli', ip: '10.0.0.1', time: '2025-07-28T14:20:00' },
  { id: 'pal5', actor: 'platform@peoplepilot.com', action: 'Enabled feature flag', target: 'AI Attrition Risk → Pro plan', ip: '10.0.0.1', time: '2025-07-28T10:05:00' },
  { id: 'pal6', actor: 'system', action: 'Invoice generated', target: 'July batch — 2,418 invoices', ip: 'internal', time: '2025-07-01T00:00:00' },
  { id: 'pal7', actor: 'platform@peoplepilot.com', action: 'Pushed announcement', target: 'Maintenance window — Aug 3', ip: '10.0.0.1', time: '2025-07-27T16:00:00' },
  { id: 'pal8', actor: 'platform@peoplepilot.com', action: 'Updated plan pricing', target: 'Enterprise → $15/emp', ip: '10.0.0.1', time: '2025-07-25T12:30:00' },
];

export const platformAnnouncements = [
  { id: 'pan1', title: 'Scheduled maintenance — Aug 3', message: 'The platform will undergo maintenance on August 3 from 2-4 AM UTC. Expect brief downtime.', audience: 'All tenants', date: '2025-07-27', status: 'Sent' },
  { id: 'pan2', title: 'New: AI Attrition Risk now on Pro', message: 'We\'ve expanded AI Attrition Risk detection to all Pro and Enterprise plans at no extra cost.', audience: 'Pro & Enterprise', date: '2025-07-22', status: 'Sent' },
  { id: 'pan3', title: 'Payroll 2.0 launch', message: 'A faster, smarter payroll engine is rolling out this week. Watch for the update in your Payroll module.', audience: 'Growth & above', date: '2025-07-18', status: 'Sent' },
  { id: 'pan4', title: 'Q3 product webinar', message: 'Join us Aug 15 for a deep dive into what\'s shipping this quarter. Registration link in the email.', audience: 'All tenants', date: '2025-07-30', status: 'Draft' },
];

export const orgPolicies = [
  { id: 'pol1', name: 'Remote Work Policy', category: 'Work Arrangement', version: '2.1', lastUpdated: '2025-06-15', status: 'Active', summary: 'Employees may work remotely up to 3 days/week with manager approval.' },
  { id: 'pol2', name: 'Leave Policy', category: 'Time Off', version: '3.0', lastUpdated: '2025-04-10', status: 'Active', summary: 'Annual leave: 24 earned, 12 casual, 12 sick days. Carry-forward up to 10 days.' },
  { id: 'pol3', name: 'Code of Conduct', category: 'Behavior', version: '1.4', lastUpdated: '2024-12-01', status: 'Active', summary: 'Defines expected professional behavior and disciplinary procedures.' },
  { id: 'pol4', name: 'Expense Reimbursement', category: 'Finance', version: '2.3', lastUpdated: '2025-05-20', status: 'Active', summary: 'Reimburses pre-approved business expenses within 30 days of submission.' },
  { id: 'pol5', name: 'Probation Policy', category: 'Employment', version: '1.2', lastUpdated: '2025-01-08', status: 'Active', summary: 'New hires undergo 90-day probation with monthly check-ins.' },
  { id: 'pol6', name: 'Dress Code', category: 'Workplace', version: '1.0', lastUpdated: '2024-08-15', status: 'Draft', summary: 'Business casual for client-facing roles; smart casual otherwise.' },
];

export const rolePermissions = [
  { id: 'r1', name: 'Super Admin', users: 1, permissions: 48, description: 'Full platform access including tenant management', color: 'danger' },
  { id: 'r2', name: 'Admin', users: 2, permissions: 42, description: 'Full tenant access including all settings', color: 'brand' },
  { id: 'r3', name: 'HR Manager', users: 4, permissions: 32, description: 'Manage people, payroll, and reports', color: 'info' },
  { id: 'r4', name: 'Manager', users: 18, permissions: 18, description: 'Manage team, approve requests, view reports', color: 'success' },
  { id: 'r5', name: 'Employee', users: 342, permissions: 8, description: 'Self-service: profile, attendance, leave, payslips', color: 'neutral' },
];

export const orgChartNodes = [
  { id: 'ceo', name: 'Sarah Chen', title: 'CEO', department: 'Executive', children: ['cto', 'cfo', 'coo', 'chro'] },
  { id: 'cto', name: 'David Kim', title: 'CTO', department: 'Engineering', children: ['eng-mgr', 'prod-mgr'] },
  { id: 'cfo', name: 'Diana Prince', title: 'CFO', department: 'Finance', children: ['fin-mgr'] },
  { id: 'coo', name: 'James Wilson', title: 'COO', department: 'Operations', children: ['ops-mgr'] },
  { id: 'chro', name: 'Marcus Lee', title: 'CHRO', department: 'HR', children: ['hr-mgr'] },
  { id: 'eng-mgr', name: 'Priya Sharma', title: 'Engineering Manager', department: 'Engineering', children: [] },
  { id: 'prod-mgr', name: 'Alex Turner', title: 'Senior PM', department: 'Product', children: [] },
  { id: 'fin-mgr', name: 'Nina Rossi', title: 'Finance Lead', department: 'Finance', children: [] },
  { id: 'ops-mgr', name: 'Omar Hassan', title: 'Ops Manager', department: 'Operations', children: [] },
  { id: 'hr-mgr', name: 'Lisa Müller', title: 'HR Manager', department: 'HR', children: [] },
];

export const employeeDocuments = [
  { id: 'doc1', employeeId: 'e1', employeeName: 'Sarah Chen', type: 'Employment Contract', uploadedOn: '2022-01-15', status: 'Verified', fileName: 'contract_sarah_chen.pdf' },
  { id: 'doc2', employeeId: 'e1', employeeName: 'Sarah Chen', type: 'ID Proof', uploadedOn: '2022-01-15', status: 'Verified', fileName: 'passport_scan.pdf' },
  { id: 'doc3', employeeId: 'e2', employeeName: 'David Kim', type: 'Employment Contract', uploadedOn: '2022-03-20', status: 'Verified', fileName: 'contract_david_kim.pdf' },
  { id: 'doc4', employeeId: 'e3', employeeName: 'Priya Sharma', type: 'Degree Certificate', uploadedOn: '2022-04-05', status: 'Pending', fileName: 'degree_priya.pdf' },
  { id: 'doc5', employeeId: 'e4', employeeName: 'Alex Turner', type: 'Previous Employment Proof', uploadedOn: '2022-06-10', status: 'Verified', fileName: 'exp_letter.pdf' },
  { id: 'doc6', employeeId: 'e5', employeeName: 'Emily Johnson', type: 'Employment Contract', uploadedOn: '2023-02-08', status: 'Verified', fileName: 'contract_emily.pdf' },
  { id: 'doc7', employeeId: 'e6', employeeName: 'Marcus Lee', type: 'Salary Revision Letter', uploadedOn: '2024-01-12', status: 'Verified', fileName: 'revision_marcus.pdf' },
  { id: 'doc8', employeeId: 'e7', employeeName: 'Diana Prince', type: 'Tax Form W-4', uploadedOn: '2024-03-01', status: 'Pending', fileName: 'w4_diana.pdf' },
];

export const employeeLifecycle = [
  { id: 'lc1', employeeName: 'Nina Rossi', employeeId: 'e11', event: 'Onboarded', date: '2025-07-15', details: 'Joined as Software Engineer in Engineering' },
  { id: 'lc2', employeeName: 'Carlos Santos', employeeId: 'e12', event: 'Promoted', date: '2025-07-10', details: 'Promoted from L3 to L4 — Senior Engineer' },
  { id: 'lc3', employeeName: 'Yuki Tanaka', employeeId: 'e13', event: 'Transferred', date: '2025-06-28', details: 'Moved from Tokyo office to San Francisco HQ' },
  { id: 'lc4', employeeName: 'Anna Schmidt', employeeId: 'e14', event: 'Probation Completed', date: '2025-06-20', details: '90-day probation completed successfully' },
  { id: 'lc5', employeeName: 'Raj Patel', employeeId: 'e15', event: 'Exited', date: '2025-06-15', details: 'Resigned — Full & Final settlement processed' },
  { id: 'lc6', employeeName: 'Sophie Dubois', employeeId: 'e16', event: 'Onboarded', date: '2025-06-01', details: 'Joined as Product Designer in Design' },
  { id: 'lc7', employeeName: 'Liam O\'Brien', employeeId: 'e17', event: 'Role Changed', date: '2025-05-22', details: 'Changed from Account Executive to Sales Manager' },
];

export const probationEmployees = [
  { id: 'pb1', employeeName: 'Nina Rossi', employeeId: 'e11', designation: 'Software Engineer', department: 'Engineering', startDate: '2025-07-15', endDate: '2025-10-13', daysLeft: 74, status: 'In Progress' },
  { id: 'pb2', employeeName: 'Sophie Dubois', employeeId: 'e16', designation: 'Product Designer', department: 'Design', startDate: '2025-06-01', endDate: '2025-08-30', daysLeft: 30, status: 'In Progress' },
  { id: 'pb3', employeeName: 'Mei Wang', employeeId: 'e18', designation: 'Data Analyst', department: 'Finance', startDate: '2025-05-15', endDate: '2025-08-13', daysLeft: 13, status: 'Review Due' },
  { id: 'pb4', employeeName: 'Noah Anderson', employeeId: 'e19', designation: 'Account Executive', department: 'Sales', startDate: '2025-04-20', endDate: '2025-07-19', daysLeft: -12, status: 'Overdue' },
];

export const transferRequests = [
  { id: 'tr1', employeeName: 'Yuki Tanaka', employeeId: 'e13', fromDept: 'Engineering', toDept: 'Engineering', fromLocation: 'Tokyo', toLocation: 'San Francisco', reason: 'Relocation for personal reasons', status: 'Approved', date: '2025-06-28' },
  { id: 'tr2', employeeName: 'Zara Khan', employeeId: 'e20', fromDept: 'Sales', toDept: 'Marketing', fromLocation: 'London', toLocation: 'London', reason: 'Career change to marketing', status: 'Pending', date: '2025-07-26' },
  { id: 'tr3', employeeName: 'Liam O\'Brien', employeeId: 'e17', fromDept: 'Sales', toDept: 'Sales', fromLocation: 'New York', toLocation: 'London', reason: 'Promotion to regional lead', status: 'Approved', date: '2025-07-20' },
  { id: 'tr4', employeeName: 'Carlos Santos', employeeId: 'e12', fromDept: 'Engineering', toDept: 'Engineering', fromLocation: 'Berlin', toLocation: 'Berlin', reason: 'Team restructuring', status: 'Rejected', date: '2025-07-15' },
];

export const offboardingEmployees = [
  { id: 'of1', employeeName: 'Raj Patel', employeeId: 'e15', designation: 'Senior Engineer', department: 'Engineering', lastDay: '2025-08-15', exitReason: 'Resignation — New opportunity', status: 'Notice Period', tasksCompleted: 3, tasksTotal: 8 },
  { id: 'of2', employeeName: 'Mei Wang', employeeId: 'e18', designation: 'Data Analyst', department: 'Finance', lastDay: '2025-08-30', exitReason: 'Resignation — Relocation', status: 'Notice Period', tasksCompleted: 1, tasksTotal: 8 },
  { id: 'of3', employeeName: 'Noah Anderson', employeeId: 'e19', designation: 'Account Executive', department: 'Sales', lastDay: '2025-07-31', exitReason: 'Termination — Performance', status: 'In Progress', tasksCompleted: 5, tasksTotal: 8 },
  { id: 'of4', employeeName: 'Kevin Malone', employeeId: 'e22', designation: 'Ops Specialist', department: 'Operations', lastDay: '2025-07-10', exitReason: 'Resignation — Career change', status: 'Completed', tasksCompleted: 8, tasksTotal: 8 },
];

export const shifts = [
  { id: 'sh1', name: 'General (9–6)', startTime: '09:00', endTime: '18:00', gracePeriod: 15, employees: 280, weekendOff: true, color: '#2563eb' },
  { id: 'sh2', name: 'Morning (6–2)', startTime: '06:00', endTime: '14:00', gracePeriod: 10, employees: 24, weekendOff: true, color: '#0d9488' },
  { id: 'sh3', name: 'Evening (2–10)', startTime: '14:00', endTime: '22:00', gracePeriod: 10, employees: 18, weekendOff: true, color: '#f59e0b' },
  { id: 'sh4', name: 'Night (10–6)', startTime: '22:00', endTime: '06:00', gracePeriod: 10, employees: 12, weekendOff: false, color: '#8b5cf6' },
  { id: 'sh5', name: 'Flexible', startTime: '—', endTime: '—', gracePeriod: 0, employees: 8, weekendOff: true, color: '#64748b' },
];

export const regularizations = [
  { id: 'rg1', employeeName: 'Sarah Chen', employeeId: 'e1', date: '2025-07-29', type: 'Missed Punch In', reason: 'Badge scanner was down', status: 'Pending', requestedOn: '2025-07-30' },
  { id: 'rg2', employeeName: 'David Kim', employeeId: 'e2', date: '2025-07-28', type: 'Missed Punch Out', reason: 'Left late after deployment', status: 'Pending', requestedOn: '2025-07-29' },
  { id: 'rg3', employeeName: 'Priya Sharma', employeeId: 'e3', date: '2025-07-25', type: 'Wrong Shift', reason: 'Covered for sick colleague', status: 'Approved', requestedOn: '2025-07-26', approver: 'Marcus Lee' },
  { id: 'rg4', employeeName: 'Alex Turner', employeeId: 'e4', date: '2025-07-22', type: 'Missed Punch In', reason: 'Traffic accident on the way', status: 'Rejected', requestedOn: '2025-07-23', approver: 'James Wilson' },
  { id: 'rg5', employeeName: 'Emily Johnson', employeeId: 'e5', date: '2025-07-20', type: 'Half-day Correction', reason: 'Doctor appointment', status: 'Approved', requestedOn: '2025-07-21', approver: 'Marcus Lee' },
];

export const timesheets = [
  { id: 'ts1', employeeName: 'Sarah Chen', employeeId: 'e1', week: 'Jul 28 – Aug 1', project: 'Core Platform', hours: 42, billable: 38, status: 'Submitted' },
  { id: 'ts2', employeeName: 'David Kim', employeeId: 'e2', week: 'Jul 28 – Aug 1', project: 'Mobile App', hours: 40, billable: 40, status: 'Approved' },
  { id: 'ts3', employeeName: 'Priya Sharma', employeeId: 'e3', week: 'Jul 28 – Aug 1', project: 'Core Platform', hours: 38, billable: 35, status: 'Pending' },
  { id: 'ts4', employeeName: 'Alex Turner', employeeId: 'e4', week: 'Jul 28 – Aug 1', project: 'Client — Stark', hours: 44, billable: 44, status: 'Approved' },
  { id: 'ts5', employeeName: 'Emily Johnson', employeeId: 'e5', week: 'Jul 28 – Aug 1', project: 'Marketing', hours: 40, billable: 0, status: 'Rejected' },
  { id: 'ts6', employeeName: 'James Wilson', employeeId: 'e8', week: 'Jul 28 – Aug 1', project: 'Operations', hours: 41, billable: 0, status: 'Submitted' },
];

export const overtimeRecords = [
  { id: 'ot1', employeeName: 'Sarah Chen', employeeId: 'e1', date: '2025-07-30', hours: 2.5, reason: 'Production incident response', status: 'Approved', rate: 1.5 },
  { id: 'ot2', employeeName: 'David Kim', employeeId: 'e2', date: '2025-07-29', hours: 3, reason: 'Deployment window', status: 'Approved', rate: 1.5 },
  { id: 'ot3', employeeName: 'Priya Sharma', employeeId: 'e3', date: '2025-07-28', hours: 1.5, reason: 'Bug fix before release', status: 'Pending', rate: 1.5 },
  { id: 'ot4', employeeName: 'Alex Turner', employeeId: 'e4', date: '2025-07-25', hours: 4, reason: 'Client deliverable', status: 'Pending', rate: 2 },
  { id: 'ot5', employeeName: 'James Wilson', employeeId: 'e8', date: '2025-07-22', hours: 2, reason: 'Quarterly closing', status: 'Approved', rate: 1.5 },
];

export const leavePolicies = [
  { id: 'lp1', type: 'Casual Leave', allocation: 12, carryForward: 0, encashable: false, noticePeriod: '1 day', color: '#2563eb' },
  { id: 'lp2', type: 'Sick Leave', allocation: 12, carryForward: 0, encashable: false, noticePeriod: 'Inform same day', color: '#0d9488' },
  { id: 'lp3', type: 'Earned Leave', allocation: 24, carryForward: 10, encashable: true, noticePeriod: '7 days', color: '#f59e0b' },
  { id: 'lp4', type: 'Maternity Leave', allocation: 84, carryForward: 0, encashable: false, noticePeriod: '30 days', color: '#ec4899' },
  { id: 'lp5', type: 'Unpaid Leave', allocation: 0, carryForward: 0, encashable: false, noticePeriod: '3 days', color: '#64748b' },
];

export const leaveBalances = employees.map((e) => ({
  id: `lb-${e.id}`,
  employeeName: `${e.firstName} ${e.lastName}`,
  employeeId: e.id,
  department: e.department,
  casual: e.leaveBalance.casual,
  sick: e.leaveBalance.sick,
  earned: e.leaveBalance.earned,
  totalUsed: 12 - e.leaveBalance.casual + (12 - e.leaveBalance.sick) + (24 - e.leaveBalance.earned),
}));

export const salaryStructures = [
  { id: 'ss1', name: 'Standard Salaried', basic: 40, hra: 20, allowances: 25, special: 15, deductionPF: 12, deductionTax: 'Variable', employees: 288 },
  { id: 'ss2', name: 'Executive', basic: 35, hra: 25, allowances: 20, special: 20, deductionPF: 12, deductionTax: 'Variable', employees: 22 },
  { id: 'ss3', name: 'Contractor', basic: 70, hra: 0, allowances: 0, special: 30, deductionPF: 0, deductionTax: 'Flat 10%', employees: 24 },
  { id: 'ss4', name: 'Intern Stipend', basic: 100, hra: 0, allowances: 0, special: 0, deductionPF: 0, deductionTax: 'None', employees: 8 },
];

export const payrollRuns = [
  { id: 'pr1', month: 'July 2025', employees: 342, gross: 2_084_000, deductions: 458_480, net: 1_625_520, status: 'Completed', runOn: '2025-07-31' },
  { id: 'pr2', month: 'June 2025', employees: 342, gross: 2_051_000, deductions: 451_220, net: 1_599_780, status: 'Completed', runOn: '2025-06-30' },
  { id: 'pr3', month: 'May 2025', employees: 338, gross: 2_028_000, deductions: 446_160, net: 1_581_840, status: 'Completed', runOn: '2025-05-31' },
  { id: 'pr4', month: 'August 2025', employees: 342, gross: 0, deductions: 0, net: 0, status: 'Draft', runOn: '—' },
];

export const loans = [
  { id: 'ln1', employeeName: 'Sarah Chen', employeeId: 'e1', type: 'Salary Advance', amount: 5000, balance: 3500, installment: 500, status: 'Active', issuedOn: '2025-05-01' },
  { id: 'ln2', employeeName: 'David Kim', employeeId: 'e2', type: 'Personal Loan', amount: 15000, balance: 9000, installment: 1000, status: 'Active', issuedOn: '2025-03-15' },
  { id: 'ln3', employeeName: 'Priya Sharma', employeeId: 'e3', type: 'Salary Advance', amount: 3000, balance: 0, installment: 500, status: 'Cleared', issuedOn: '2025-01-10' },
  { id: 'ln4', employeeName: 'Alex Turner', employeeId: 'e4', type: 'Relocation Loan', amount: 8000, balance: 6000, installment: 800, status: 'Active', issuedOn: '2025-06-20' },
];

export const complianceFilings = [
  { id: 'cf1', name: 'Federal Tax Withholding', jurisdiction: 'USA (Federal)', dueDate: '2025-08-15', status: 'Up to Date', lastFiled: '2025-07-15' },
  { id: 'cf2', name: 'State Unemployment Tax', jurisdiction: 'California', dueDate: '2025-08-31', status: 'Up to Date', lastFiled: '2025-07-31' },
  { id: 'cf3', name: 'Social Security Contributions', jurisdiction: 'UK', dueDate: '2025-08-19', status: 'Action Required', lastFiled: '2025-07-19' },
  { id: 'cf4', name: 'Pension Fund (GKV)', jurisdiction: 'Germany', dueDate: '2025-08-10', status: 'Up to Date', lastFiled: '2025-07-10' },
  { id: 'cf5', name: 'Health Insurance Premium', jurisdiction: 'Japan', dueDate: '2025-08-25', status: 'Up to Date', lastFiled: '2025-07-25' },
  { id: 'cf6', name: 'Annual Tax Reconciliation', jurisdiction: 'USA (Federal)', dueDate: '2025-09-30', status: 'Draft', lastFiled: '2024-09-30' },
];

export const taxDeclarations = [
  { id: 'td1', employeeName: 'Sarah Chen', employeeId: 'e1', regime: 'New', investments: 45000, medicalInsurance: 8000, homeLoanInterest: 0, status: 'Submitted' },
  { id: 'td2', employeeName: 'David Kim', employeeId: 'e2', regime: 'Old', investments: 60000, medicalInsurance: 12000, homeLoanInterest: 25000, status: 'Submitted' },
  { id: 'td3', employeeName: 'Priya Sharma', employeeId: 'e3', regime: 'New', investments: 20000, medicalInsurance: 5000, homeLoanInterest: 0, status: 'Pending' },
  { id: 'td4', employeeName: 'Alex Turner', employeeId: 'e4', regime: 'Old', investments: 75000, medicalInsurance: 15000, homeLoanInterest: 18000, status: 'Submitted' },
  { id: 'td5', employeeName: 'Emily Johnson', employeeId: 'e5', regime: 'New', investments: 0, medicalInsurance: 0, homeLoanInterest: 0, status: 'Not Filed' },
];

export const fullFinalSettlements = [
  { id: 'ff1', employeeName: 'Raj Patel', employeeId: 'e15', designation: 'Senior Engineer', lastDay: '2025-08-15', salaryPayable: 8500, leaveEncashment: 3200, bonusProRated: 1500, deductions: 2000, netPayable: 11200, status: 'Pending' },
  { id: 'ff2', employeeName: 'Kevin Malone', employeeId: 'e22', designation: 'Ops Specialist', lastDay: '2025-07-10', salaryPayable: 4200, leaveEncashment: 1800, bonusProRated: 0, deductions: 500, netPayable: 5500, status: 'Completed' },
  { id: 'ff3', employeeName: 'Noah Anderson', employeeId: 'e19', designation: 'Account Executive', lastDay: '2025-07-31', salaryPayable: 5200, leaveEncashment: 600, bonusProRated: 0, deductions: 800, netPayable: 5000, status: 'In Progress' },
];

export const compensationData = [
  { id: 'cmp1', employeeName: 'Sarah Chen', employeeId: 'e1', designation: 'CEO', department: 'Executive', baseSalary: 280000, bonus: 60000, equity: '0.8%', totalComp: 340000, percentile: 95 },
  { id: 'cmp2', employeeName: 'David Kim', employeeId: 'e2', designation: 'CTO', department: 'Engineering', baseSalary: 240000, bonus: 50000, equity: '0.5%', totalComp: 290000, percentile: 92 },
  { id: 'cmp3', employeeName: 'Priya Sharma', employeeId: 'e3', designation: 'Engineering Manager', department: 'Engineering', baseSalary: 180000, bonus: 25000, equity: '0.1%', totalComp: 205000, percentile: 85 },
  { id: 'cmp4', employeeName: 'Alex Turner', employeeId: 'e4', designation: 'Senior PM', department: 'Product', baseSalary: 165000, bonus: 20000, equity: '0.08%', totalComp: 185000, percentile: 80 },
  { id: 'cmp5', employeeName: 'Emily Johnson', employeeId: 'e5', designation: 'Account Executive', department: 'Sales', baseSalary: 95000, bonus: 30000, equity: '—', totalComp: 125000, percentile: 65 },
  { id: 'cmp6', employeeName: 'Marcus Lee', employeeId: 'e7', designation: 'CHRO', department: 'HR', baseSalary: 200000, bonus: 40000, equity: '0.2%', totalComp: 240000, percentile: 88 },
];

export const payrollCostBreakdown = [
  { name: 'Base Salary', value: 1620000, fill: '#2563eb' },
  { name: 'Bonuses', value: 180000, fill: '#0d9488' },
  { name: 'Allowances', value: 156000, fill: '#f59e0b' },
  { name: 'Employer Taxes', value: 96000, fill: '#ec4899' },
  { name: 'Benefits', value: 52000, fill: '#8b5cf6' },
];

export const systemHealth = [
  { id: 'sh1', service: 'API Gateway', status: 'Operational', uptime: '99.98%', latency: '42ms' },
  { id: 'sh2', service: 'Database (Primary)', status: 'Operational', uptime: '99.99%', latency: '12ms' },
  { id: 'sh3', service: 'Payroll Engine', status: 'Operational', uptime: '99.95%', latency: '180ms' },
  { id: 'sh4', service: 'File Storage', status: 'Degraded', uptime: '99.80%', latency: '340ms' },
  { id: 'sh5', service: 'AI Assistant', status: 'Operational', uptime: '99.92%', latency: '890ms' },
  { id: 'sh6', service: 'Email Service', status: 'Operational', uptime: '99.97%', latency: '220ms' },
];

// ---- Performance ----
export const reviewCycles = [
  { id: 'rc1', name: 'H1 2025 Review', type: 'Semi-Annual', status: 'Active', startDate: '2025-07-01', endDate: '2025-08-15', participants: 342, completed: 218, selfDone: 280, managerDone: 195 },
  { id: 'rc2', name: 'Q1 2025 Check-in', type: 'Quarterly', status: 'Completed', startDate: '2025-03-15', endDate: '2025-04-15', participants: 338, completed: 338, selfDone: 338, managerDone: 338 },
  { id: 'rc3', name: '2024 Annual Review', type: 'Annual', status: 'Completed', startDate: '2024-12-01', endDate: '2025-01-15', participants: 320, completed: 320, selfDone: 320, managerDone: 320 },
  { id: 'rc4', name: 'Mid-Year Probation', type: 'Probation', status: 'Draft', startDate: '2025-08-01', endDate: '2025-08-30', participants: 12, completed: 0, selfDone: 0, managerDone: 0 },
];

export const nineBoxGrid = [
  { id: 'nb1', employeeName: 'Sarah Chen', designation: 'CEO', performance: 'High', potential: 'High', box: 9 },
  { id: 'nb2', employeeName: 'David Kim', designation: 'CTO', performance: 'High', potential: 'High', box: 9 },
  { id: 'nb3', employeeName: 'Priya Sharma', designation: 'Eng Manager', performance: 'High', potential: 'High', box: 9 },
  { id: 'nb4', employeeName: 'Alex Turner', designation: 'Senior PM', performance: 'High', potential: 'Medium', box: 6 },
  { id: 'nb5', employeeName: 'Emily Johnson', designation: 'Account Exec', performance: 'Medium', potential: 'High', box: 8 },
  { id: 'nb6', employeeName: 'Marcus Lee', designation: 'CHRO', performance: 'High', potential: 'Medium', box: 6 },
  { id: 'nb7', employeeName: 'Nina Rossi', designation: 'Software Engineer', performance: 'Medium', potential: 'High', box: 8 },
  { id: 'nb8', employeeName: 'Sophie Dubois', designation: 'Product Designer', performance: 'Medium', potential: 'Medium', box: 5 },
  { id: 'nb9', employeeName: 'Omar Hassan', designation: 'Ops Manager', performance: 'Medium', potential: 'Medium', box: 5 },
  { id: 'nb10', employeeName: 'Carlos Santos', designation: 'Senior Engineer', performance: 'High', potential: 'Low', box: 3 },
  { id: 'nb11', employeeName: 'Lisa Müller', designation: 'HR Manager', performance: 'Medium', potential: 'Low', box: 2 },
  { id: 'nb12', employeeName: 'Mei Wang', designation: 'Data Analyst', performance: 'Low', potential: 'Medium', box: 4 },
];

export const feedbackEntries = [
  { id: 'fb1', from: 'Sarah Chen', to: 'Priya Sharma', type: 'Appreciation', message: 'Great job leading the v2.0 migration. The team rallied behind your clear plan.', date: '2025-07-28', isPublic: true },
  { id: 'fb2', from: 'David Kim', to: 'Nina Rossi', type: 'Appreciation', message: 'Quick ramp-up on the codebase. Already shipping features in week 3!', date: '2025-07-25', isPublic: true },
  { id: 'fb3', from: 'Marcus Lee', to: 'Alex Turner', type: 'Constructive', message: 'Consider sharing roadmap decisions earlier with stakeholders to reduce last-minute churn.', date: '2025-07-22', isPublic: false },
  { id: 'fb4', from: 'Priya Sharma', to: 'Carlos Santos', type: 'Appreciation', message: 'Excellent mentorship for the junior devs during onboarding week.', date: '2025-07-20', isPublic: true },
  { id: 'fb5', from: 'James Wilson', to: 'Omar Hassan', type: 'Appreciation', message: 'Smooth office move execution — minimal disruption to operations.', date: '2025-07-18', isPublic: true },
  { id: 'fb6', from: 'Alex Turner', to: 'Sophie Dubois', type: 'Constructive', message: 'Design reviews would benefit from earlier engineering input on feasibility.', date: '2025-07-15', isPublic: false },
];

export const oneOnOnes = [
  { id: 'oo1', manager: 'Priya Sharma', employee: 'Nina Rossi', date: '2025-08-05', time: '10:00', duration: 30, status: 'Scheduled', agenda: 'Onboarding check-in, first sprint review' },
  { id: 'oo2', manager: 'Marcus Lee', employee: 'Lisa Müller', date: '2025-08-02', time: '14:00', duration: 45, status: 'Scheduled', agenda: 'Q3 HR initiatives, recruitment plan' },
  { id: 'oo3', manager: 'David Kim', employee: 'Carlos Santos', date: '2025-07-30', time: '11:00', duration: 30, status: 'Completed', agenda: 'Promotion discussion, L4 expectations' },
  { id: 'oo4', manager: 'Alex Turner', employee: 'Sophie Dubois', date: '2025-07-28', time: '15:30', duration: 30, status: 'Completed', agenda: 'Design system progress, blocker removal' },
  { id: 'oo5', manager: 'Priya Sharma', employee: 'Carlos Santos', date: '2025-08-07', time: '09:30', duration: 45, status: 'Scheduled', agenda: 'Performance goals alignment' },
];

export const performanceScoreTrend = [
  { cycle: 'Q1', score: 3.8 },
  { cycle: 'Q2', score: 3.9 },
  { cycle: 'Q3', score: 4.1 },
  { cycle: 'Q4', score: 4.0 },
  { cycle: 'H1 25', score: 4.2 },
];

export const performanceDist = [
  { name: 'Exceeds (5)', value: 48, fill: '#0d9488' },
  { name: 'Strong (4)', value: 132, fill: '#2563eb' },
  { name: 'Meets (3)', value: 118, fill: '#f59e0b' },
  { name: 'Below (2)', value: 32, fill: '#ef4444' },
  { name: 'Needs Plan', value: 12, fill: '#64748b' },
];

// ---- Hiring ----
export const requisitions = [
  { id: 'rq1', title: 'Senior Frontend Engineer', department: 'Engineering', location: 'San Francisco', type: 'Full-time', headcount: 2, filled: 0, status: 'Open', openedOn: '2025-07-01', budget: 180000, hiringManager: 'David Kim' },
  { id: 'rq2', title: 'Product Manager', department: 'Product', location: 'Remote', type: 'Full-time', headcount: 1, filled: 0, status: 'Open', openedOn: '2025-06-20', budget: 160000, hiringManager: 'Alex Turner' },
  { id: 'rq3', title: 'UX Designer', department: 'Design', location: 'New York', type: 'Full-time', headcount: 1, filled: 0, status: 'Open', openedOn: '2025-07-15', budget: 130000, hiringManager: 'Sophie Dubois' },
  { id: 'rq4', title: 'Account Executive', department: 'Sales', location: 'London', type: 'Full-time', headcount: 3, filled: 1, status: 'Open', openedOn: '2025-05-10', budget: 95000, hiringManager: 'Emily Johnson' },
  { id: 'rq5', title: 'Data Analyst', department: 'Finance', location: 'Remote', type: 'Contract', headcount: 1, filled: 0, status: 'On Hold', openedOn: '2025-07-08', budget: 85000, hiringManager: 'Diana Prince' },
  { id: 'rq6', title: 'DevOps Engineer', department: 'Engineering', location: 'Berlin', type: 'Full-time', headcount: 1, filled: 1, status: 'Closed', openedOn: '2025-04-22', budget: 150000, hiringManager: 'David Kim' },
];

export const interviews = [
  { id: 'iv1', candidate: 'Jim Halpert', role: 'Product Manager', round: 'Technical', interviewer: 'Alex Turner', date: '2025-08-02', time: '10:00', duration: 60, status: 'Scheduled', type: 'Video' },
  { id: 'iv2', candidate: 'Pam Beesly', role: 'UX Designer', round: 'Portfolio Review', interviewer: 'Sophie Dubois', date: '2025-08-01', time: '14:00', duration: 45, status: 'Scheduled', type: 'On-site' },
  { id: 'iv3', candidate: 'Stanley Hudson', role: 'Senior Frontend Engineer', round: 'System Design', interviewer: 'Priya Sharma', date: '2025-07-31', time: '11:00', duration: 90, status: 'Scheduled', type: 'Video' },
  { id: 'iv4', candidate: 'Michael Scott', role: 'Senior Frontend Engineer', round: 'HR Screen', interviewer: 'Lisa Müller', date: '2025-07-30', time: '09:00', duration: 30, status: 'Completed', type: 'Video' },
  { id: 'iv5', candidate: 'Dwight Schrute', role: 'Account Executive', round: 'Final', interviewer: 'Emily Johnson', date: '2025-07-29', time: '15:00', duration: 45, status: 'Completed', type: 'On-site' },
  { id: 'iv6', candidate: 'Angela Martin', role: 'Data Analyst', round: 'Technical', interviewer: 'Diana Prince', date: '2025-08-03', time: '13:00', duration: 60, status: 'Scheduled', type: 'Video' },
];

export const offers = [
  { id: 'of1', candidate: 'Dwight Schrute', role: 'Account Executive', department: 'Sales', location: 'London', salary: 95000, bonus: 15000, equity: '0.02%', status: 'Sent', sentOn: '2025-07-28', expiresOn: '2025-08-04', response: 'Pending' },
  { id: 'of2', candidate: 'Oscar Martinez', role: 'Product Manager', department: 'Product', location: 'Remote', salary: 160000, bonus: 20000, equity: '0.05%', status: 'Accepted', sentOn: '2025-07-15', expiresOn: '2025-07-22', response: 'Accepted' },
  { id: 'of3', candidate: 'Stanley Hudson', role: 'Senior Frontend Engineer', department: 'Engineering', location: 'San Francisco', salary: 175000, bonus: 25000, equity: '0.04%', status: 'Draft', sentOn: '—', expiresOn: '—', response: '—' },
  { id: 'of4', candidate: 'Pam Beesly', role: 'UX Designer', department: 'Design', location: 'New York', salary: 130000, bonus: 12000, equity: '0.03%', status: 'Pending Approval', sentOn: '—', expiresOn: '—', response: '—' },
];

export const referrals = [
  { id: 'ref1', referrer: 'Priya Sharma', candidate: 'Stanley Hudson', role: 'Senior Frontend Engineer', status: 'Interview', bonusEligible: true, date: '2025-07-15' },
  { id: 'ref2', referrer: 'David Kim', candidate: 'Oscar Martinez', role: 'Product Manager', status: 'Hired', bonusEligible: true, bonusPaid: 3000, date: '2025-06-28' },
  { id: 'ref3', referrer: 'Marcus Lee', candidate: 'Pam Beesly', role: 'UX Designer', status: 'Screening', bonusEligible: false, date: '2025-07-22' },
  { id: 'ref4', referrer: 'Emily Johnson', candidate: 'Creed Bratton', role: 'Account Executive', status: 'Rejected', bonusEligible: false, date: '2025-07-05' },
  { id: 'ref5', referrer: 'James Wilson', candidate: 'Angela Martin', role: 'Data Analyst', status: 'Applied', bonusEligible: false, date: '2025-07-28' },
];

// ---- Helpdesk ----
export const helpdeskCategories = [
  { id: 'hc1', name: 'IT Hardware', sla: '24h', tickets: 18, resolved: 15, avgResolution: '6h' },
  { id: 'hc2', name: 'IT Software', sla: '12h', tickets: 32, resolved: 28, avgResolution: '3h' },
  { id: 'hc3', name: 'Payroll', sla: '8h', tickets: 12, resolved: 10, avgResolution: '4h' },
  { id: 'hc4', name: 'Leave', sla: '8h', tickets: 8, resolved: 7, avgResolution: '2h' },
  { id: 'hc5', name: 'Facilities', sla: '48h', tickets: 14, resolved: 12, avgResolution: '18h' },
  { id: 'hc6', name: 'Finance', sla: '24h', tickets: 6, resolved: 4, avgResolution: '12h' },
];

export const kbArticles = [
  { id: 'kb1', title: 'How to apply for leave', category: 'Leave', views: 1240, helpful: 92, updatedOn: '2025-07-15' },
  { id: 'kb2', title: 'Resetting your email password', category: 'IT Software', views: 890, helpful: 88, updatedOn: '2025-07-10' },
  { id: 'kb3', title: 'Understanding your payslip', category: 'Payroll', views: 670, helpful: 95, updatedOn: '2025-06-28' },
  { id: 'kb4', title: 'Requesting a new laptop or peripheral', category: 'IT Hardware', views: 520, helpful: 85, updatedOn: '2025-07-20' },
  { id: 'kb5', title: 'Expense reimbursement guide', category: 'Finance', views: 410, helpful: 90, updatedOn: '2025-06-15' },
  { id: 'kb6', title: 'Setting up VPN on your device', category: 'IT Software', views: 380, helpful: 87, updatedOn: '2025-07-05' },
];

export const ticketTrend = [
  { week: 'W1', opened: 12, resolved: 10 },
  { week: 'W2', opened: 18, resolved: 16 },
  { week: 'W3', opened: 15, resolved: 14 },
  { week: 'W4', opened: 22, resolved: 20 },
];

// ---- Assets ----
export const assetRequests = [
  { id: 'ar1', employeeName: 'Nina Rossi', item: 'External Monitor', reason: 'Need dual monitor setup', status: 'Pending', date: '2025-07-28' },
  { id: 'ar2', employeeName: 'Sophie Dubois', item: 'Wacom Tablet', reason: 'Design work requires tablet', status: 'Approved', date: '2025-07-25', approvedBy: 'Marcus Lee' },
  { id: 'ar3', employeeName: 'Carlos Santos', item: 'Mechanical Keyboard', reason: 'Current one broken', status: 'Pending', date: '2025-07-22' },
  { id: 'ar4', employeeName: 'Mei Wang', item: 'Docking Station', reason: 'WFH setup', status: 'Rejected', date: '2025-07-18', approvedBy: 'James Wilson' },
  { id: 'ar5', employeeName: 'Liam O\'Brien', item: 'Headphones', reason: 'Open office noise', status: 'Fulfilled', date: '2025-07-10', approvedBy: 'Marcus Lee' },
];

// ---- Expenses ----
export const expenseCategories = [
  { id: 'ec1', name: 'Travel', limit: 5000, approvalRequired: true, color: '#2563eb' },
  { id: 'ec2', name: 'Meals', limit: 200, approvalRequired: false, color: '#0d9488' },
  { id: 'ec3', name: 'Software', limit: 1000, approvalRequired: true, color: '#f59e0b' },
  { id: 'ec4', name: 'Office Supplies', limit: 500, approvalRequired: false, color: '#ec4899' },
  { id: 'ec5', name: 'Training', limit: 2000, approvalRequired: true, color: '#8b5cf6' },
];

export const expenseTrend = [
  { month: 'Feb', value: 18500 },
  { month: 'Mar', value: 22000 },
  { month: 'Apr', value: 19800 },
  { month: 'May', value: 24500 },
  { month: 'Jun', value: 21200 },
  { month: 'Jul', value: 26800 },
];

export const expenseByCategory = [
  { name: 'Travel', value: 12400, fill: '#2563eb' },
  { name: 'Software', value: 5800, fill: '#f59e0b' },
  { name: 'Meals', value: 3200, fill: '#0d9488' },
  { name: 'Training', value: 2800, fill: '#8b5cf6' },
  { name: 'Office', value: 2600, fill: '#ec4899' },
];

// ---- Learning ----
export const trainingAssignments = [
  { id: 'ta1', course: 'Workplace Harassment Prevention', assignedTo: 'All Employees', assignedBy: 'HR Team', dueDate: '2025-08-15', progress: 93, completed: 320, total: 342 },
  { id: 'ta2', course: 'Data Privacy & Security', assignedTo: 'All Employees', assignedBy: 'IT Team', dueDate: '2025-08-30', progress: 84, completed: 289, total: 342 },
  { id: 'ta3', course: 'Leadership Essentials', assignedTo: 'Engineering Managers', assignedBy: 'Marcus Lee', dueDate: '2025-09-15', progress: 54, completed: 15, total: 28 },
  { id: 'ta4', course: 'Advanced Excel for Finance', assignedTo: 'Finance Team', assignedBy: 'Diana Prince', dueDate: '2025-08-20', progress: 67, completed: 30, total: 45 },
];

export const learningProgress = [
  { id: 'lp1', employeeName: 'Nina Rossi', course: 'Effective Communication', progress: 100, status: 'Completed', score: 92 },
  { id: 'lp2', employeeName: 'Sophie Dubois', course: 'Leadership Essentials', progress: 60, status: 'In Progress', score: null },
  { id: 'lp3', employeeName: 'Carlos Santos', course: 'Data Privacy & Security', progress: 100, status: 'Completed', score: 88 },
  { id: 'lp4', employeeName: 'Mei Wang', course: 'Advanced Excel', progress: 45, status: 'In Progress', score: null },
  { id: 'lp5', employeeName: 'Liam O\'Brien', course: 'Customer First Mindset', progress: 100, status: 'Completed', score: 95 },
  { id: 'lp6', employeeName: 'Zara Khan', course: 'Workplace Harassment Prevention', progress: 80, status: 'In Progress', score: null },
];

// ---- Engagement ----
export const recognitionEntries = [
  { id: 'rec1', from: 'Sarah Chen', to: 'Priya Sharma', award: 'Innovation Star', message: 'For the brilliant v2.0 architecture', date: '2025-07-28', points: 100 },
  { id: 'rec2', from: 'David Kim', to: 'Nina Rossi', award: 'Rising Star', message: 'Exceptional onboarding performance', date: '2025-07-25', points: 50 },
  { id: 'rec3', from: 'Marcus Lee', to: 'Lisa Müller', award: 'Team Player', message: 'For organizing the team offsite flawlessly', date: '2025-07-22', points: 75 },
  { id: 'rec4', from: 'Alex Turner', to: 'Sophie Dubois', award: 'Excellence', message: 'Design system delivered ahead of schedule', date: '2025-07-20', points: 100 },
  { id: 'rec5', from: 'Emily Johnson', to: 'Omar Hassan', award: 'Above & Beyond', message: 'Smooth office relocation', date: '2025-07-18', points: 75 },
];

export const companyEvents = [
  { id: 'ev1', title: 'Company All-Hands', date: '2025-08-08', time: '10:00 AM PST', location: 'Main Auditorium + Virtual', attendees: 342, type: 'Company' },
  { id: 'ev2', title: 'Engineering Hackathon', date: '2025-08-15', time: '9:00 AM', location: 'SF HQ', attendees: 42, type: 'Team' },
  { id: 'ev3', title: 'New Joiner Orientation', date: '2025-08-05', time: '11:00 AM', location: 'Conference Room A', attendees: 8, type: 'Onboarding' },
  { id: 'ev4', title: 'Wellness Wednesday', date: '2025-08-06', time: '3:00 PM', location: 'Rooftop', attendees: 45, type: 'Wellness' },
  { id: 'ev5', title: 'Sales Kickoff Q3', date: '2025-08-12', time: '9:30 AM', location: 'London Office', attendees: 22, type: 'Team' },
];

export const polls = [
  { id: 'pl1', question: 'Where should the next company offsite be?', options: [{ text: 'Hawaii', votes: 142 }, { text: 'Barcelona', votes: 98 }, { text: 'Tokyo', votes: 67 }, { text: 'Lisbon', votes: 35 }], status: 'Active', totalVotes: 342, closesOn: '2025-08-05' },
  { id: 'pl2', question: 'Preferred WFH days for Q3?', options: [{ text: 'Mon & Fri', votes: 156 }, { text: 'Tue & Thu', votes: 89 }, { text: 'Wed only', votes: 54 }, { text: 'Flexible', votes: 43 }], status: 'Closed', totalVotes: 342, closesOn: '2025-07-20' },
  { id: 'pl3', question: 'Which wellness activity should we fund?', options: [{ text: 'Yoga classes', votes: 0 }, { text: 'Gym membership', votes: 0 }, { text: 'Meditation app', votes: 0 }], status: 'Draft', totalVotes: 0, closesOn: '2025-08-15' },
];

export const engagementScore = [
  { month: 'Feb', score: 72 },
  { month: 'Mar', score: 74 },
  { month: 'Apr', score: 76 },
  { month: 'May', score: 78 },
  { month: 'Jun', score: 79 },
  { month: 'Jul', score: 81 },
];

// ---- Settings ----
export const integrations = [
  { id: 'int1', name: 'Slack', category: 'Communication', connected: true, icon: 'MessageSquare', description: 'Send notifications and approvals via Slack' },
  { id: 'int2', name: 'Google Workspace', category: 'Productivity', connected: true, icon: 'Mail', description: 'Sync calendar and import employees' },
  { id: 'int3', name: 'Zoom', category: 'Video', connected: true, icon: 'Video', description: 'Schedule interviews and 1:1s with Zoom' },
  { id: 'int4', name: 'Stripe', category: 'Payments', connected: false, icon: 'CreditCard', description: 'Process payroll and reimbursements' },
  { id: 'int5', name: 'BambooHR', category: 'HRIS', connected: false, icon: 'Users', description: 'Import employee data from BambooHR' },
  { id: 'int6', name: 'Okta', category: 'Security', connected: false, icon: 'ShieldCheck', description: 'Single sign-on and user provisioning' },
];

export const customFields = [
  { id: 'cf1', label: 'Blood Group', entity: 'Employee', type: 'Text', required: false, active: true },
  { id: 'cf2', label: 'Emergency Contact', entity: 'Employee', type: 'Text', required: true, active: true },
  { id: 'cf3', label: 'Probation End Date', entity: 'Employee', type: 'Date', required: false, active: true },
  { id: 'cf4', label: 'Cost Center', entity: 'Department', type: 'Text', required: false, active: true },
  { id: 'cf5', label: 'Project Code', entity: 'Timesheet', type: 'Text', required: true, active: true },
  { id: 'cf6', label: 'T-shirt Size', entity: 'Employee', type: 'Dropdown', required: false, active: false },
];

export const approvalWorkflows = [
  { id: 'aw1', name: 'Leave Approval', trigger: 'Leave request submitted', approvers: ['Direct Manager', 'HR Admin'], active: true },
  { id: 'aw2', name: 'Expense Approval', trigger: 'Expense > $500', approvers: ['Direct Manager', 'Finance'], active: true },
  { id: 'aw3', name: 'Asset Request', trigger: 'Asset request submitted', approvers: ['IT Admin'], active: true },
  { id: 'aw4', name: 'Overtime Approval', trigger: 'Overtime submitted', approvers: ['Direct Manager'], active: true },
  { id: 'aw5', name: 'Hiring Requisition', trigger: 'New requisition', approvers: ['Dept Head', 'Finance', 'HR'], active: false },
];

// ---- Reports ----
export const reportLibrary = [
  { id: 'rl1', name: 'Headcount Report', category: 'People', lastRun: '2025-07-30', schedule: 'Monthly', format: 'PDF' },
  { id: 'rl2', name: 'Attrition Analysis', category: 'People', lastRun: '2025-07-28', schedule: 'Quarterly', format: 'Excel' },
  { id: 'rl3', name: 'Payroll Summary', category: 'Payroll', lastRun: '2025-07-31', schedule: 'Monthly', format: 'PDF' },
  { id: 'rl4', name: 'Attendance Report', category: 'Attendance', lastRun: '2025-07-29', schedule: 'Weekly', format: 'Excel' },
  { id: 'rl5', name: 'Leave Utilization', category: 'Leave', lastRun: '2025-07-25', schedule: 'Monthly', format: 'PDF' },
  { id: 'rl6', name: 'Diversity Report', category: 'People', lastRun: '2025-07-01', schedule: 'Quarterly', format: 'PDF' },
  { id: 'rl7', name: 'Hiring Pipeline Report', category: 'Hiring', lastRun: '2025-07-27', schedule: 'Weekly', format: 'Excel' },
  { id: 'rl8', name: 'Expense Summary', category: 'Finance', lastRun: '2025-07-28', schedule: 'Monthly', format: 'Excel' },
];

export const reportBuilderModules = [
  { id: 'rbm1', name: 'People', icon: 'Users', fields: 24 },
  { id: 'rbm2', name: 'Attendance', icon: 'CalendarCheck', fields: 12 },
  { id: 'rbm3', name: 'Leave', icon: 'CalendarOff', fields: 8 },
  { id: 'rbm4', name: 'Payroll', icon: 'Banknote', fields: 18 },
  { id: 'rbm5', name: 'Performance', icon: 'TrendingUp', fields: 10 },
  { id: 'rbm6', name: 'Hiring', icon: 'Briefcase', fields: 14 },
];

// ---- Employee Self-Service ----
export const myAttendance = [
  { id: 'ma1', date: '2025-07-31', punchIn: '09:02 AM', punchOut: '06:15 PM', hours: 8.2, status: 'Present' },
  { id: 'ma2', date: '2025-07-30', punchIn: '09:05 AM', punchOut: '06:10 PM', hours: 8.1, status: 'Present' },
  { id: 'ma3', date: '2025-07-29', punchIn: '10:15 AM', punchOut: '06:30 PM', hours: 7.25, status: 'Late' },
  { id: 'ma4', date: '2025-07-28', punchIn: '09:00 AM', punchOut: '06:00 PM', hours: 8.0, status: 'Present' },
  { id: 'ma5', date: '2025-07-25', punchIn: '—', punchOut: '—', hours: 0, status: 'WFH' },
  { id: 'ma6', date: '2025-07-24', punchIn: '09:03 AM', punchOut: '06:05 PM', hours: 8.0, status: 'Present' },
  { id: 'ma7', date: '2025-07-23', punchIn: '—', punchOut: '—', hours: 0, status: 'Leave' },
];

export const myLeaveRequests = [
  { id: 'mlr1', type: 'Casual', from: '2025-08-04', to: '2025-08-05', days: 2, reason: 'Family function', status: 'Pending', appliedOn: '2025-07-28' },
  { id: 'mlr2', type: 'Sick', from: '2025-06-12', to: '2025-06-12', days: 1, reason: 'Fever', status: 'Approved', appliedOn: '2025-06-12', approver: 'Sarah Chen' },
  { id: 'mlr3', type: 'Earned', from: '2025-04-07', to: '2025-04-11', days: 5, reason: 'Vacation', status: 'Approved', appliedOn: '2025-03-28', approver: 'Sarah Chen' },
  { id: 'mlr4', type: 'Casual', from: '2025-03-14', to: '2025-03-14', days: 1, reason: 'Personal work', status: 'Rejected', appliedOn: '2025-03-10', approver: 'Sarah Chen' },
];

export const myPayslips = [
  { id: 'mps1', month: 'July 2025', gross: 14000, deductions: 3080, net: 10920, status: 'Generated' },
  { id: 'mps2', month: 'June 2025', gross: 14000, deductions: 3080, net: 10920, status: 'Disbursed' },
  { id: 'mps3', month: 'May 2025', gross: 14000, deductions: 3080, net: 10920, status: 'Disbursed' },
  { id: 'mps4', month: 'April 2025', gross: 14000, deductions: 3080, net: 10920, status: 'Disbursed' },
  { id: 'mps5', month: 'March 2025', gross: 14000, deductions: 3080, net: 10920, status: 'Disbursed' },
  { id: 'mps6', month: 'February 2025', gross: 14000, deductions: 3080, net: 10920, status: 'Disbursed' },
];

export const myTaxDeclaration = [
  { id: 'mtd1', section: '80C — Investments', limit: 150000, declared: 45000, verified: true },
  { id: 'mtd2', section: '80D — Medical Insurance', limit: 25000, declared: 8000, verified: true },
  { id: 'mtd3', section: '24(b) — Home Loan Interest', limit: 200000, declared: 0, verified: false },
  { id: 'mtd4', section: '80E — Education Loan', limit: 0, declared: 0, verified: false },
];

export const myExpenses = [
  { id: 'mex1', category: 'Travel', amount: 1240, date: '2025-07-22', status: 'Pending', description: 'Client visit to NYC' },
  { id: 'mex2', category: 'Meals', amount: 85, date: '2025-07-25', status: 'Approved', description: 'Team lunch with vendors' },
  { id: 'mex3', category: 'Software', amount: 320, date: '2025-07-20', status: 'Pending', description: 'Figma annual subscription' },
  { id: 'mex4', category: 'Travel', amount: 680, date: '2025-07-18', status: 'Reimbursed', description: 'Conference flights' },
  { id: 'mex5', category: 'Office Supplies', amount: 145, date: '2025-07-15', status: 'Rejected', description: 'Whiteboards' },
];

export const myAssets = [
  { id: 'mas1', name: 'MacBook Pro 16"', type: 'Laptop', serial: 'MBP2024-001', assignedOn: '2024-01-15', value: 2799 },
  { id: 'mas2', name: 'Dell Monitor 27"', type: 'Monitor', serial: 'DEL27-102', assignedOn: '2024-03-20', value: 450 },
  { id: 'mas3', name: 'Logitech MX Master 3S', type: 'Accessory', serial: 'LOG-MX-501', assignedOn: '2024-04-10', value: 99 },
];

export const myCourses = [
  { id: 'mc1', title: 'Effective Communication at Work', category: 'Soft Skills', progress: 100, status: 'Completed', score: 92 },
  { id: 'mc2', title: 'Data Privacy & Security', category: 'Compliance', progress: 60, status: 'In Progress', score: null },
  { id: 'mc3', title: 'Leadership Essentials', category: 'Leadership', progress: 0, status: 'Assigned', score: null },
  { id: 'mc4', title: 'Customer First Mindset', category: 'Soft Skills', progress: 100, status: 'Completed', score: 95 },
];

export const myGoals = [
  { id: 'mg1', title: 'Complete React certification', progress: 80, dueDate: '2025-08-30', status: 'On Track', keyResults: [{ id: 'mkr1', title: 'Finish 3 modules', done: true }, { id: 'mkr2', title: 'Pass final exam', done: false }] },
  { id: 'mg2', title: 'Improve code review SLA to 4 hours', progress: 65, dueDate: '2025-09-15', status: 'On Track', keyResults: [{ id: 'mkr3', title: 'Reduce avg review time', done: true }, { id: 'mkr4', title: 'Maintain for 2 sprints', done: false }] },
  { id: 'mg3', title: 'Mentor 2 junior engineers', progress: 45, dueDate: '2025-10-01', status: 'At Risk', keyResults: [{ id: 'mkr5', title: 'Weekly 1:1s', done: true }, { id: 'mkr6', title: 'First PR review session', done: false }] },
];

export const myTickets = [
  { id: 'mtk1', subject: 'Cannot access payslip for June', category: 'Payroll', priority: 'High', status: 'Open', createdAt: '2025-07-29' },
  { id: 'mtk2', subject: 'Request for ergonomic chair', category: 'Facilities', priority: 'Low', status: 'Resolved', createdAt: '2025-07-20' },
  { id: 'mtk3', subject: 'Email signature not updating', category: 'IT Software', priority: 'Low', status: 'Closed', createdAt: '2025-07-18' },
];

export const myDocuments = [
  { id: 'mdoc1', type: 'Employment Contract', uploadedOn: '2024-01-15', status: 'Verified', fileName: 'contract.pdf' },
  { id: 'mdoc2', type: 'ID Proof (Passport)', uploadedOn: '2024-01-15', status: 'Verified', fileName: 'passport.pdf' },
  { id: 'mdoc3', type: 'Degree Certificate', uploadedOn: '2024-01-20', status: 'Verified', fileName: 'degree.pdf' },
  { id: 'mdoc4', type: 'Previous Employment Proof', uploadedOn: '2024-01-20', status: 'Verified', fileName: 'exp_letter.pdf' },
  { id: 'mdoc5', type: 'Tax Form W-4', uploadedOn: '2025-01-08', status: 'Pending', fileName: 'w4_2025.pdf' },
];

export const requestLetterTypes = [
  { id: 'rl1', type: 'Salary Certificate', description: 'Proof of income for loans, visas, or housing', icon: 'ReceiptText', processingTime: '2 business days' },
  { id: 'rl2', type: 'Employment Verification', description: 'Confirm employment status for background checks', icon: 'BadgeCheck', processingTime: '1 business day' },
  { id: 'rl3', type: 'Experience Letter', description: 'Summary of tenure and responsibilities', icon: 'FileText', processingTime: '3 business days' },
  { id: 'rl4', type: 'Relieving Letter', description: 'Issued at the time of exit from the company', icon: 'FileSignature', processingTime: '5 business days' },
  { id: 'rl5', type: 'Salary Revision Letter', description: 'Official letter reflecting salary changes', icon: 'Coins', processingTime: '2 business days' },
  { id: 'rl6', type: 'No Objection Certificate', description: 'NOC for travel, secondary employment, etc.', icon: 'CircleCheck', processingTime: '2 business days' },
];
