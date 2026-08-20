'use client';

import * as React from 'react';
import type { Role, Tenant, Notification } from './types';
import { tenants as mockTenants, notifications as mockNotifications } from './mock-data';

interface AppState {
  role: Role;
  tenant: Tenant | null;
  sidebarCollapsed: boolean;
  notifications: Notification[];
  unreadCount: number;
}

interface AppContextValue extends AppState {
  setRole: (role: Role) => void;
  setTenant: (tenant: Tenant | null) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (v: boolean) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
  signIn: (role: Role, tenant?: Tenant | null) => void;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AppContext = React.createContext<AppContextValue | null>(null);

const ROLE_STORAGE = 'pp_role';
const TENANT_STORAGE = 'pp_tenant';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = React.useState<Role>('employee');
  const [tenant, setTenantState] = React.useState<Tenant | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [notifications, setNotifications] =
    React.useState<Notification[]>(mockNotifications);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // hydrate from localStorage
  React.useEffect(() => {
    try {
      const savedRole = localStorage.getItem(ROLE_STORAGE) as Role | null;
      const savedTenantId = localStorage.getItem(TENANT_STORAGE);
      if (savedRole) {
        setRoleState(savedRole);
        const t =
          savedTenantId
            ? mockTenants.find((x) => x.id === savedTenantId) ?? null
            : mockTenants[0];
        setTenantState(t ?? null);
        setIsAuthenticated(true);
      }
    } catch {}
  }, []);

  const setRole = React.useCallback((r: Role) => {
    setRoleState(r);
    try {
      localStorage.setItem(ROLE_STORAGE, r);
    } catch {}
  }, []);

  const setTenant = React.useCallback((t: Tenant | null) => {
    setTenantState(t);
    try {
      if (t) localStorage.setItem(TENANT_STORAGE, t.id);
      else localStorage.removeItem(TENANT_STORAGE);
    } catch {}
  }, []);

  const toggleSidebar = React.useCallback(
    () => setSidebarCollapsed((v) => !v),
    []
  );

  const markAllRead = React.useCallback(
    () =>
      setNotifications((n) => n.map((x) => ({ ...x, read: true }))),
    []
  );
  const markRead = React.useCallback(
    (id: string) =>
      setNotifications((n) =>
        n.map((x) => (x.id === id ? { ...x, read: true } : x))
      ),
    []
  );

  const signIn = React.useCallback(
    (r: Role, t: Tenant | null = mockTenants[0]) => {
      setRole(r);
      setTenant(t);
      setIsAuthenticated(true);
    },
    [setRole, setTenant]
  );

  const signOut = React.useCallback(() => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(ROLE_STORAGE);
      localStorage.removeItem(TENANT_STORAGE);
    } catch {}
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const value: AppContextValue = {
    role,
    tenant,
    sidebarCollapsed,
    notifications,
    unreadCount,
    setRole,
    setTenant,
    toggleSidebar,
    setSidebarCollapsed,
    markAllRead,
    markRead,
    signIn,
    signOut,
    isAuthenticated,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = React.useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
