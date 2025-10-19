import type { Order } from "./orders.types";

export interface Payment {
  Id: number;
  TransactionId: string;
  Amount: number;
  Status: PaymentStatus;
  Gateway?: string;
  GatewayTransactionId?: string;
  Notes?: string;
  CreatedAt: string;
  ProcessedAt?: string;

  OrderId: number;
  PaymentMethodId: number;

  Order?: Order;
  PaymentMethod?: PaymentMethod;
}

export interface PaymentMethod {
  Id: number;
  Name: string;
  Type: string;
  IsActive: boolean;
  Configuration?: string;
  CreatedAt: string;
  Payments?: Payment[];
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
