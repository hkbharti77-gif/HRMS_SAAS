import {
  employees,
  leaveRequests,
  expenseClaims,
  tickets,
  goals,
  candidates,
  attendance,
  announcements,
  complianceFilings,
  probationEmployees,
  offboardingEmployees,
  payrollRuns,
  loans,
  myLeaveRequests,
  myExpenses,
  myTickets,
  myGoals,
  myPayslips,
  myAttendance,
  headcountTrend,
  attritionTrend,
  departmentDist,
  hiringFunnel,
} from './mock-data';
import { formatCurrency } from './format';
import type { Role } from './types';

export interface CopilotAction {
  label: string;
  href?: string;
  icon: string;
}

export interface CopilotResponse {
  text: string;
  actions?: CopilotAction[];
  chart?: { type: 'trend' | 'donut' | 'bars'; data: unknown[]; xKey: string; yKey?: string };
  table?: { headers: string[]; rows: string[][] };
  priority?: 'info' | 'warning' | 'danger';
}

interface Intent {
  match: (q: string) => boolean;
  respond: (role: Role) => CopilotResponse;
}

const num = (n: number) => n.toLocaleString('en-US');

const intents: Intent[] = [
  {
    match: (q) => /head ?count|how many (people|employee)/.test(q),
    respond: () => ({
      text: `Your current headcount is ${num(342)} — up from ${num(318)} six months ago (+24 employees). Engineering is your largest department at 120 people.`,
      chart: { type: 'trend', data: headcountTrend, xKey: 'month', yKey: 'value' },
      actions: [{ label: 'View People Directory', href: '/admin/people', icon: 'Users' }, { label: 'View Reports', href: '/admin/reports/analytics', icon: 'BarChart3' }],
    }),
  },
  {
    match: (q) => /attrition|turnover/.test(q),
    respond: () => ({
      text: `Your rolling 12-month attrition rate is 9.2%, down from 9.1% in February. Engineering has the highest attrition at 11.4%. I recommend scheduling stay interviews with at-risk engineers.`,
      chart: { type: 'trend', data: attritionTrend, xKey: 'month', yKey: 'value' },
      priority: 'warning',
      actions: [{ label: 'View Performance Reports', href: '/admin/performance/reports', icon: 'TrendingDown' }],
    }),
  },
  {
    match: (q) => /pending.*(leave|approval)|leave.*pending|approvals/.test(q),
    respond: (role) => {
      const pending = leaveRequests.filter((l) => l.status === 'Pending');
      const rows = pending.slice(0, 5).map((l) => [l.employeeName, l.type, `${l.days}d`, l.status]);
      const href = role === 'hr-manager' ? '/hr-manager/leave-approvals' : role === 'manager' ? '/manager/approvals' : '/admin/leave/approvals';
      return {
        text: `There ${pending.length === 1 ? 'is' : 'are'} ${pending.length} pending leave approval${pending.length !== 1 ? 's' : ''} awaiting your action. The oldest request is 3 days old.`,
        table: { headers: ['Employee', 'Type', 'Days', 'Status'], rows },
        priority: 'warning',
        actions: [{ label: 'Review Approvals', href, icon: 'CheckSquare' }],
      };
    },
  },
  {
    match: (q) => /pipeline|hiring.*summary|recruit/.test(q),
    respond: () => {
      const total = hiringFunnel[0].value || 1;
      const rows = hiringFunnel.map((s) => [s.stage, num(s.value), `${Math.round((s.value / total) * 100)}%`]);
      return {
        text: `Your hiring pipeline: ${num(hiringFunnel[0].value)} applied, ${num(hiringFunnel[1].value)} in screening, ${num(hiringFunnel[2].value)} in interviews, ${num(hiringFunnel[3].value)} offers extended, ${num(hiringFunnel[4].value)} hired this quarter. 3 offers are pending response.`,
        table: { headers: ['Stage', 'Count', 'Conversion'], rows },
        actions: [{ label: 'View Hiring Pipeline', href: '/admin/hiring/pipeline', icon: 'KanbanSquare' }],
      };
    },
  },
  {
    match: (q) => /compliance|filing|regulator/.test(q),
    respond: () => {
      const pending = complianceFilings.filter((c) => c.status === 'Action Required');
      return {
        text: `You have ${pending.length} compliance filings requiring action. The most urgent is "${pending[0]?.name ?? 'PF Return'}" due ${pending[0]?.dueDate ?? 'soon'}. Late filings may incur penalties.`,
        priority: 'danger',
        actions: [{ label: 'View Compliance', href: '/admin/payroll/compliance', icon: 'Landmark' }],
      };
    },
  },
  {
    match: (q) => /probation/.test(q),
    respond: () => ({
      text: `There ${probationEmployees.length === 1 ? 'is' : 'are'} ${probationEmployees.length} employee${probationEmployees.length !== 1 ? 's' : ''} currently on probation. ${probationEmployees.filter((p) => p.daysLeft <= 7).length} review${probationEmployees.filter((p) => p.daysLeft <= 7).length === 1 ? '' : 's'} due within the next 7 days.`,
      priority: 'warning',
      actions: [{ label: 'Review Probation', href: '/admin/people/probation', icon: 'Hourglass' }],
    }),
  },
  {
    match: (q) => /offboard|exit|resign/.test(q),
    respond: () => {
      const active = offboardingEmployees.filter((o) => o.status !== 'Completed');
      return {
        text: `${active.length} offboarding${active.length === 1 ? '' : 's'} in progress. Average task completion is ${Math.round(active.reduce((s, o) => s + (o.tasksCompleted / o.tasksTotal) * 100, 0) / (active.length || 1))}%. Make sure exit interviews and asset returns are tracked.`,
        actions: [{ label: 'View Offboarding', href: '/admin/people/offboarding', icon: 'LogOut' }],
      };
    },
  },
  {
    match: (q) => /payroll.*run|run.*payroll|process.*payroll/.test(q),
    respond: () => {
      const draft = payrollRuns.find((r) => r.status === 'Draft');
      return {
        text: draft
          ? `The ${draft.month} payroll run is in Draft status for ${draft.employees} employees. Estimated net pay is ${formatCurrency(draft.net, 'USD', true)}. Would you like to start processing?`
          : `The last payroll run was completed for ${payrollRuns[0]?.employees ?? 342} employees. The next run is scheduled for Aug 31.`,
        actions: draft ? [{ label: 'Run Payroll', href: '/admin/payroll/run', icon: 'PlayCircle' }] : [{ label: 'View Payroll', href: '/admin/payroll', icon: 'Banknote' }],
      };
    },
  },
  {
    match: (q) => /loan|advance/.test(q),
    respond: () => ({
      text: `There ${loans.length === 1 ? 'is' : 'are'} ${loans.filter((l) => l.status === 'Active').length} active loan${loans.filter((l) => l.status === 'Active').length === 1 ? '' : 's'} with a total outstanding balance of ${formatCurrency(loans.filter((l) => l.status === 'Active').reduce((s, l) => s + l.balance, 0), 'USD', true)}. Average deduction per month is $420.`,
      actions: [{ label: 'View Loans', href: '/admin/payroll/loans', icon: 'HandCoins' }],
    }),
  },
  {
    match: (q) => /expense.*pending|pending.*expense|reimburs/.test(q),
    respond: (role) => {
      const pending = expenseClaims.filter((e) => e.status === 'Pending');
      const total = pending.reduce((s, e) => s + e.amount, 0);
      const href = role === 'hr-manager' ? '/hr-manager/leave-approvals' : '/admin/expenses/approvals';
      return {
        text: `${pending.length} expense claim${pending.length !== 1 ? 's' : ''} pending approval, totaling ${formatCurrency(total, 'USD', true)}. Average approval time is 1.5 days.`,
        priority: 'warning',
        actions: [{ label: 'Review Expenses', href, icon: 'Wallet' }],
      };
    },
  },
  {
    match: (q) => /ticket.*open|open.*ticket|helpdesk.*summary/.test(q),
    respond: (role) => {
      const open = tickets.filter((t) => t.status === 'Open' || t.status === 'In Progress');
      const high = open.filter((t) => t.priority === 'High' || t.priority === 'Urgent');
      const href = role === 'hr-manager' ? '/hr-manager/helpdesk' : '/admin/helpdesk/tickets';
      return {
        text: `${open.length} ticket${open.length !== 1 ? 's' : ''} currently open. ${high.length} are high priority. Average resolution time is 4.2 hours.`,
        priority: high.length > 0 ? 'warning' : 'info',
        actions: [{ label: 'View Tickets', href, icon: 'Ticket' }],
      };
    },
  },
  {
    match: (q) => /performance|team.*score|okr|goal/.test(q),
    respond: (role) => {
      const onTrack = goals.filter((g) => g.status === 'On Track').length;
      const atRisk = goals.filter((g) => g.status === 'At Risk').length;
      const avgProgress = Math.round(goals.reduce((s, g) => s + g.progress, 0) / goals.length);
      const href = role === 'manager' ? '/manager/performance' : role === 'hr-manager' ? '/hr-manager/performance' : '/admin/performance';
      return {
        text: `Company performance average is 82%, up 4 points from last quarter. ${onTrack} of ${goals.length} goals are on track, ${atRisk} are at risk. Average goal progress is ${avgProgress}%.`,
        actions: [{ label: 'View Performance', href, icon: 'TrendingUp' }],
      };
    },
  },
  {
    match: (q) => /candidate|interview/.test(q),
    respond: () => {
      const inInterview = candidates.filter((c) => c.stage === 'Interview');
      const topMatch = candidates.reduce((best, c) => (c.matchScore > best.matchScore ? c : best), candidates[0]);
      return {
        text: `${inInterview.length} candidates in the interview stage this week. Top match: ${topMatch.name} (${topMatch.matchScore}% match) for the ${topMatch.role} role. 2 interviews are scheduled for tomorrow.`,
        actions: [{ label: 'View Interviews', href: '/admin/hiring/interviews', icon: 'CalendarClock' }],
      };
    },
  },
  {
    match: (q) => /announcement|news|update/.test(q),
    respond: (role) => {
      const href = role === 'hr-manager' ? '/hr-manager/engagement' : '/admin/engagement';
      return {
        text: `Your latest announcement: "${announcements[0].title}" published ${announcements[0].date}. It has been viewed by 287 employees (84% readership).`,
        actions: [{ label: 'Post Announcement', href, icon: 'Megaphone' }],
      };
    },
  },
  // Employee self-service intents
  {
    match: (q) => /my.*leave.*balance|how many.*leave|leave.*left/.test(q),
    respond: () => ({
      text: `You have 6 Casual, 4 Sick, and 12 Earned leaves remaining this year. You've used 6 Casual and 8 Sick days so far. Your Casual balance is below average — consider using Earned leave for longer breaks.`,
      actions: [{ label: 'Apply Leave', href: '/employee/leave/apply', icon: 'Plus' }, { label: 'View Balance', href: '/employee/leave/balance', icon: 'Scale' }],
    }),
  },
  {
    match: (q) => /apply.*leave|request.*leave/.test(q),
    respond: () => ({
      text: `I can help you draft a leave request. You have 6 Casual leaves remaining. Based on your calendar, the best dates with minimal team impact are Aug 25-27 (no scheduled meetings).`,
      actions: [{ label: 'Apply Now', href: '/employee/leave/apply', icon: 'Send' }],
    }),
  },
  {
    match: (q) => /leave.*policy|policy.*leave/.test(q),
    respond: () => ({
      text: `Casual leave: 12/year, max 3 consecutive days, requires manager approval. Sick leave: 12/year, medical certificate needed beyond 2 days. Earned leave: 24/year, 7 days notice required, up to 10 days carry-forward. Maternity: 84 days as per policy.`,
      actions: [{ label: 'View Full Policy', href: '/admin/leave/policy', icon: 'BookOpen' }],
    }),
  },
  {
    match: (q) => /my.*payslip|salary|my.*pay/.test(q),
    respond: () => {
      const latest = myPayslips[0];
      return {
        text: `Your ${latest.month} payslip is ready — gross ${formatCurrency(latest.gross)}, deductions ${formatCurrency(latest.deductions)}, net pay ${formatCurrency(latest.net)}. You can download it from the Payslips section.`,
        actions: [{ label: 'View Payslips', href: '/employee/payslips', icon: 'ReceiptText' }],
      };
    },
  },
  {
    match: (q) => /my.*expense|my.*claim/.test(q),
    respond: () => {
      const pending = myExpenses.filter((e) => e.status === 'Pending');
      const total = pending.reduce((s, e) => s + e.amount, 0);
      return {
        text: `You have ${pending.length} pending expense claim${pending.length !== 1 ? 's' : ''} totaling ${formatCurrency(total)}. Average approval time is 1.5 days.`,
        actions: [{ label: 'File New Expense', href: '/employee/expenses', icon: 'Plus' }],
      };
    },
  },
  {
    match: (q) => /my.*ticket|my.*support|raise.*ticket/.test(q),
    respond: () => {
      const open = myTickets.filter((t) => t.status === 'Open');
      return {
        text: `You have ${open.length} open ticket${open.length !== 1 ? 's' : ''}. ${open[0] ? `"${open[0].subject}" — priority ${open[0].priority}, raised 2 days ago.` : ''} The IT team is investigating.`,
        actions: [{ label: 'Raise New Ticket', href: '/employee/helpdesk', icon: 'Plus' }, { label: 'View My Tickets', href: '/employee/helpdesk', icon: 'Ticket' }],
      };
    },
  },
  {
    match: (q) => /my.*goal|my.*progress|my.*okr/.test(q),
    respond: () => {
      const onTrack = myGoals.filter((g) => g.status === 'On Track').length;
      const atRisk = myGoals.filter((g) => g.status === 'At Risk').length;
      return {
        text: `Your goal progress: ${onTrack} on track, ${atRisk} at risk. "Complete React certification" is 80% done. "Mentor 2 junior engineers" is 45% — I recommend scheduling mentoring sessions this week.`,
        priority: atRisk > 0 ? 'warning' : 'info',
        actions: [{ label: 'View My Goals', href: '/employee/performance', icon: 'Target' }],
      };
    },
  },
  {
    match: (q) => /my.*attendance|punch|clock.*in/.test(q),
    respond: () => ({
      text: `Your attendance this month: 20 present days, 1 late, 1 WFH day. Average hours: 8.1h/day. No regularization needed. You haven't punched in yet today.`,
      actions: [{ label: 'Punch In', href: '/employee/attendance', icon: 'Clock' }],
    }),
  },
];

export function copilotAnswer(question: string, role: Role): CopilotResponse {
  const q = question.toLowerCase();
  for (const intent of intents) {
    if (intent.match(q)) return intent.respond(role);
  }
  return {
    text: "I'm Pilot Copilot — I can help with leave, payroll, expenses, performance, hiring, compliance, attendance, and more. Try asking about pending approvals, headcount trends, or your leave balance.",
  };
}

export function copilotSuggestions(role: Role): string[] {
  if (role === 'employee') return [
    'How many leaves do I have left?',
    "What's my latest payslip?",
    'Are any of my goals at risk?',
    'Raise a support ticket',
  ];
  if (role === 'manager') return [
    'What approvals are pending?',
    "Show my team's performance",
    'Who is on leave today?',
    'Give feedback to a team member',
  ];
  if (role === 'hr-manager') return [
    'Any pending leave approvals?',
    'Show probation summary',
    'Are any compliance filings due?',
    'How many offboardings in progress?',
  ];
  return [
    "What's the headcount trend?",
    'Show hiring pipeline summary',
    "What's the attrition rate?",
    'Any compliance alerts?',
  ];
}

export interface CopilotInsight {
  id: string;
  title: string;
  description: string;
  priority: 'info' | 'warning' | 'danger';
  href: string;
  icon: string;
}

export function copilotInsights(role: Role): CopilotInsight[] {
  if (role === 'employee') {
    const insights: CopilotInsight[] = [];
    const pendingLeave = myLeaveRequests.filter((l) => l.status === 'Pending');
    if (pendingLeave.length > 0) insights.push({ id: 'leave-pending', title: 'Leave request pending', description: `Your ${pendingLeave[0].type} leave for ${pendingLeave[0].days} day${pendingLeave[0].days > 1 ? 's' : ''} is awaiting approval.`, priority: 'info', href: '/employee/leave/apply', icon: 'CalendarOff' });
    const pendingExp = myExpenses.filter((e) => e.status === 'Pending');
    if (pendingExp.length > 0) insights.push({ id: 'exp-pending', title: `${pendingExp.length} expense${pendingExp.length > 1 ? 's' : ''} pending`, description: `Totaling ${formatCurrency(pendingExp.reduce((s, e) => s + e.amount, 0))} — awaiting manager approval.`, priority: 'info', href: '/employee/expenses', icon: 'Wallet' });
    const atRiskGoals = myGoals.filter((g) => g.status === 'At Risk');
    if (atRiskGoals.length > 0) insights.push({ id: 'goal-risk', title: 'Goal at risk', description: `"${atRiskGoals[0].title}" is behind schedule. Consider scheduling a catch-up session.`, priority: 'warning', href: '/employee/performance', icon: 'AlertTriangle' });
    const openTickets = myTickets.filter((t) => t.status === 'Open');
    if (openTickets.length > 0) insights.push({ id: 'ticket-open', title: 'Support ticket open', description: `"${openTickets[0].subject}" — our team is working on it.`, priority: 'info', href: '/employee/helpdesk', icon: 'LifeBuoy' });
    return insights.slice(0, 4);
  }
  if (role === 'manager') {
    const insights: CopilotInsight[] = [];
    const pendingLeave = leaveRequests.filter((l) => l.status === 'Pending');
    if (pendingLeave.length > 0) insights.push({ id: 'leave-approve', title: `${pendingLeave.length} leave approval${pendingLeave.length > 1 ? 's' : ''} pending`, description: `Oldest request is 3 days old. Review to avoid delays.`, priority: 'warning', href: '/manager/approvals', icon: 'CheckSquare' });
    const atRisk = goals.filter((g) => g.status === 'At Risk');
    if (atRisk.length > 0) insights.push({ id: 'goal-risk', title: 'Team goal at risk', description: `"${atRisk[0].title}" is behind. Consider a check-in with the team.`, priority: 'warning', href: '/manager/performance', icon: 'AlertTriangle' });
    return insights.slice(0, 4);
  }
  // admin + hr-manager
  const insights: CopilotInsight[] = [];
  const pendingCompliance = complianceFilings.filter((c) => c.status === 'Action Required');
  if (pendingCompliance.length > 0) insights.push({ id: 'compliance', title: `${pendingCompliance.length} compliance filing${pendingCompliance.length > 1 ? 's' : ''} due`, description: `"${pendingCompliance[0]?.name}" requires action by ${pendingCompliance[0]?.dueDate}.`, priority: 'danger', href: '/admin/payroll/compliance', icon: 'Landmark' });
  const pendingLeave = leaveRequests.filter((l) => l.status === 'Pending');
  if (pendingLeave.length > 0) insights.push({ id: 'leave', title: `${pendingLeave.length} leave approval${pendingLeave.length > 1 ? 's' : ''} pending`, description: `Across ${new Set(pendingLeave.map((l) => l.employeeName)).size} employees.`, priority: 'warning', href: role === 'hr-manager' ? '/hr-manager/leave-approvals' : '/admin/leave/approvals', icon: 'CheckSquare' });
  const probationUrgent = probationEmployees.filter((p) => p.daysLeft <= 7);
  if (probationUrgent.length > 0) insights.push({ id: 'probation', title: `${probationUrgent.length} probation review${probationUrgent.length > 1 ? 's' : ''} due soon`, description: `${probationUrgent[0].employeeName} — ${probationUrgent[0].daysLeft} days left.`, priority: 'warning', href: role === 'hr-manager' ? '/hr-manager/people' : '/admin/people/probation', icon: 'Hourglass' });
  const pendingExp = expenseClaims.filter((e) => e.status === 'Pending');
  if (pendingExp.length > 0) insights.push({ id: 'expense', title: `${pendingExp.length} expense claim${pendingExp.length > 1 ? 's' : ''} pending`, description: `Totaling ${formatCurrency(pendingExp.reduce((s, e) => s + e.amount, 0), 'USD', true)}.`, priority: 'info', href: role === 'hr-manager' ? '/hr-manager/leave-approvals' : '/admin/expenses/approvals', icon: 'Wallet' });
  return insights.slice(0, 4);
}
