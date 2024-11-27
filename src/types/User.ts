export type UserRole = 'client' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  lastLogin: Date;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export interface AdminStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  salesTrend?: number;
  ordersTrend?: number;
  customersTrend?: number;
  salesGrowth?: number;
  recentOrders: Array<{
    id: string;
    date: Date;
    amount: number;
    status: string;
  }>;
}