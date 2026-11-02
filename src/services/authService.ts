import { Employee, AuthSession } from '../types/auth';

const STORAGE_KEY_EMPLOYEES = 'tito_store_employees_v1';
const STORAGE_KEY_SESSION = 'tito_store_auth_session_v1';

export const DEFAULT_EMPLOYEES: Employee[] = [
  {
    id: 'emp-01',
    name: 'طاهر تيتو',
    username: 'taher',
    password: '123',
    pin: '1111',
    role: 'owner',
    roleTitleAr: 'مالك المحل والمؤسس (Super Admin)',
    phone: '01020272266',
    avatarColor: 'bg-red-600',
    isActive: true,
    createdAt: '2026-01-01',
    lastLogin: 'الآن (جلسة نشطة)',
    permissions: {
      canBillPOS: true,
      canPrintReceipts: true,
      canViewDailySales: true,
      canEditInventory: true,
      canManageEmployees: true,
      canDispatchMaintenance: true,
      canViewProfitMargins: true,
      canApplyDiscounts: true,
    },
  },
  {
    id: 'emp-02',
    name: 'أحمد',
    username: 'ahmed',
    password: '123',
    pin: '2222',
    role: 'manager',
    roleTitleAr: 'مدير المحل والمركز (Store Manager)',
    phone: '01020272266',
    avatarColor: 'bg-neutral-800',
    isActive: true,
    createdAt: '2026-01-05',
    lastLogin: 'اليوم 09:15 ص',
    permissions: {
      canBillPOS: true,
      canPrintReceipts: true,
      canViewDailySales: true,
      canEditInventory: true,
      canManageEmployees: true,
      canDispatchMaintenance: true,
      canViewProfitMargins: true,
      canApplyDiscounts: true,
    },
  },
  {
    id: 'emp-03',
    name: 'مصطفى كاشير',
    username: 'cashier',
    password: '123',
    pin: '3333',
    role: 'cashier',
    roleTitleAr: 'كاشير نقاط البيع (POS Cashier)',
    phone: '01020272266',
    avatarColor: 'bg-neutral-800',
    isActive: true,
    createdAt: '2026-02-01',
    lastLogin: 'اليوم 08:30 ص',
    permissions: {
      canBillPOS: true,
      canPrintReceipts: true,
      canViewDailySales: false,
      canEditInventory: false,
      canManageEmployees: false,
      canDispatchMaintenance: false,
      canViewProfitMargins: false,
      canApplyDiscounts: true,
    },
  },
  {
    id: 'emp-04',
    name: 'الأسطى إبراهيم',
    username: 'tech',
    password: '123',
    pin: '4444',
    role: 'technician',
    roleTitleAr: 'كبير فنيي ورشة الصيانة (Technician)',
    phone: '01020272266',
    avatarColor: 'bg-neutral-800',
    isActive: true,
    createdAt: '2026-02-10',
    lastLogin: 'أمس 06:40 م',
    permissions: {
      canBillPOS: false,
      canPrintReceipts: true,
      canViewDailySales: false,
      canEditInventory: false,
      canManageEmployees: false,
      canDispatchMaintenance: true,
      canViewProfitMargins: false,
      canApplyDiscounts: false,
    },
  },
];

export const getStoredEmployees = (): Employee[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EMPLOYEES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_EMPLOYEES, JSON.stringify(DEFAULT_EMPLOYEES));
      return DEFAULT_EMPLOYEES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_EMPLOYEES;
  }
};

export const saveStoredEmployees = (employees: Employee[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY_EMPLOYEES, JSON.stringify(employees));
  } catch (e) {
    console.error('Failed to save employees', e);
  }
};

export const getStoredSession = (): AuthSession => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSION);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }
  // Default logged in as Ahmed (Manager)
  const defaultEmp = DEFAULT_EMPLOYEES[1];
  const initialSession: AuthSession = {
    employee: defaultEmp,
    isAuthenticated: true,
    isTerminalLocked: false,
    loginTimestamp: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(initialSession));
  return initialSession;
};

export const saveStoredSession = (session: AuthSession): void => {
  try {
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
  } catch (e) {
    console.error('Failed to save session', e);
  }
};
