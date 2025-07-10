export interface User {
  id: string;
  firstName: string;
  lastName: string;
  profilePictureUrl?: string;
  email: string;
  role: "admin" | "manager" | "user";
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  ordersCount: number;
  totalSpent: number;
  createdAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  revenueChange: number;
  totalOrders: number;
  ordersChange: number;
  newCustomers: number;
  customersChange: number;
  conversionRate: number;
  conversionChange: number;
  salesData: {
    date: string;
    sales: number;
  }[];
  topProducts: {
    id: string;
    name: string;
    sales: number;
  }[];
  recentOrders: Order[];
}
