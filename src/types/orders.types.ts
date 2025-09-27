import type { ApplicationUser } from "./auth.types";
import type { Product, Variant } from "./products.types";

export enum ShippingStatus {
  Pending = "Pending",
  Processing = "Processing",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
  Refunded = "Refunded",
}

export enum PaymentStatus {
  Pending = "Pending",
  Processing = "Processing",
  Completed = "Completed",
  CashOnDelivery = "CashOnDelivery",
  Failed = "Failed",
  Cancelled = "Cancelled",
  Refunded = "Refunded",
  Disputed = "Disputed",
}

export interface Order {
  id: number;
  orderNumber: string;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  notes?: string;
  subTotal: number;
  totalAmount: number;

  // Shipping
  shippingFirstName: string;
  shippingLastName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  shippingCountry: string;
  shippingPhone?: string;

  createdAt: string;
  updatedAt?: string;
  shippedAt?: string;
  deliveredAt?: string;

  shippingStatus: ShippingStatus;
  paymentStatus: PaymentStatus;

  userId: string;
  user?: ApplicationUser;
  orderItems: OrderItem[];
  payments: Payment[];
}

// Order Item
export interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productName: string;
  productSKU?: string;

  orderId: number;
  productId: number;
  productVariantId?: number;

  order?: Order;
  product?: Product;
  productVariant?: Variant;
}

export interface CreateOrderItemDto {
  quantity: number;
  unitPrice?: number;
  totalPrice?: number;
  productName?: string;
  productSKU?: string;
  orderId: number;
  productId: number;
  productVariantId?: number;
}

export interface UpdateOrderItemDto {
  id: number;
  quantity: number;
  orderId: number;
  productId: number;
  productVariantId?: number;
}

// Payment
export interface Payment {
  id: number;
  transactionId: string;
  amount: number;
  status: PaymentStatus;
  gateway?: string;
  gatewayTransactionId?: string;
  notes?: string;
  createdAt: string;
  processedAt?: string;

  orderId: number;
  paymentMethodId: number;

  order?: Order;
  paymentMethod?: PaymentMethod;
}

// Payment Method
export interface PaymentMethod {
  id: number;
  name: string; // e.g. "Credit Card"
  type: string; // e.g. "stripe", "paypal"
  isActive: boolean;
  configuration?: string; // JSON config
  createdAt: string;
  payments?: Payment[];
}
