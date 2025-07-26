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
  id: number;
  name: string;
  description?: string;
  shortDescription?: string;
  sku: string;
  price: number;
  comparePrice?: number;
  stockQuantity: number;
  trackQuantity: boolean;
  isActive: boolean;
  isFeatured: boolean;
  weight: number;
  dimensions?: string;
  tags?: string;
  createdAt: string;
  categoryId?: number;
  category?: Category | null;
  images: Image[];
  variants: Variant[];
}

export interface Image {
  id: number;
  url: string;
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
  createdAt: string;
  productId: number;
}

export interface Variant {
  id: number;
  sku: string;
  price?: number;
  stockQuantity: number;
  isActive: boolean;
  color: string;
  size: string;
  createdAt: string;
  productId: number;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrls: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  parentCategoryId?: number;
  parentCategory?: Category | null;
  childCategories: Category[];
  products: Product[];
}

export interface SubCategory {
  id: number;
  name: string;
  description?: string;
  imageUrls: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  categoryId: number;
  category?: Category;
  products: any[]; // Adjust type based on your Product interface if available
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
