export interface DashboardStats {
  TotalProducts: number;
  TotalOrders: number;
  TotalCustomers: number;
  MonthlySales: { Month: string; Total: number }[];
  SalesByCategory: { Category: string; Total: number }[];
}
