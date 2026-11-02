export type EmployeeRole = 'owner' | 'manager' | 'cashier' | 'technician';

export interface Employee {
  id: string;
  name: string;
  username: string;
  password: string; // Plain/hashed in mock for instant verification
  pin: string; // 4-digit PIN for instant terminal unlock
  role: EmployeeRole;
  roleTitleAr: string;
  phone: string;
  avatarColor: string;
  isActive: boolean;
  createdAt: string;
  lastLogin: string;
  permissions: {
    canBillPOS: boolean;
    canPrintReceipts: boolean;
    canViewDailySales: boolean;
    canEditInventory: boolean;
    canManageEmployees: boolean;
    canDispatchMaintenance: boolean;
    canViewProfitMargins: boolean;
    canApplyDiscounts: boolean;
  };
}

export interface AuthSession {
  employee: Employee | null;
  isAuthenticated: boolean;
  isTerminalLocked: boolean;
  loginTimestamp: string | null;
}
