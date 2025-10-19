import type { ApplicationUser } from "./auth.types";
import type { Payment, PaymentStatus } from "./payments.types";
import type { Product } from "./products.types";
import type { Variant } from "./variants.types";

export enum ShippingStatus {
  Pending = "Pending",
  Processing = "Processing",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
  Refunded = "Refunded",
}

export interface Order {
  Id: number;
  OrderNumber: string;
  TaxAmount: number;
  ShippingAmount: number;
  DiscountAmount: number;
  Notes?: string;
  SubTotal: number;
  TotalAmount: number;

  // Shipping
  ShippingFirstName: string;
  ShippingLastName: string;
  ShippingAddress: string;
  ShippingCity: string;
  ShippingState: string;
  ShippingZipCode: string;
  ShippingCountry: string;
  ShippingPhone?: string;

  CreatedAt: string;
  UpdatedAt?: string;
  ShippedAt?: string;
  DeliveredAt?: string;

  ShippingStatus: ShippingStatus;
  PaymentStatus: PaymentStatus;

  UserId: string;
  User?: ApplicationUser;
  OrderItems: OrderItem[];
  Payments: Payment[];
}

// Order Item
export interface OrderItem {
  Id: number;
  Quantity: number;
  UnitPrice: number;
  TotalPrice: number;
  ProductName: string;
  ProductSKU?: string;

  OrderId: number;
  ProductId: number;
  ProductVariantId?: number;

  Order?: Order;
  Product?: Product;
  ProductVariant?: Variant;
}

export interface CreateOrderItemDto {
  Quantity: number;
  UnitPrice?: number;
  TotalPrice?: number;
  ProductName?: string;
  ProductSKU?: string;
  OrderId: number;
  ProductId: number;
  ProductVariantId?: number;
}

export interface UpdateOrderItemDto {
  Id: number;
  Quantity: number;
  OrderId: number;
  ProductId: number;
  ProductVariantId?: number;
}
