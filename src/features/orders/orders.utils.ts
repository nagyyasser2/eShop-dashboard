import { ShippingStatus } from "../../types/orders.types";
import { PaymentStatus } from "../../types/payments.types";

const getShippingStatusString = (
  numericStatus: number | string
): ShippingStatus => {
  const statusMap: Record<number, ShippingStatus> = {
    0: ShippingStatus.Pending,
    1: ShippingStatus.Processing,
    2: ShippingStatus.Shipped,
    3: ShippingStatus.Delivered,
    4: ShippingStatus.Cancelled,
  };

  if (typeof numericStatus === "string") return numericStatus as ShippingStatus;
  return statusMap[numericStatus] || ShippingStatus.Pending;
};

const getPaymentStatusString = (
  numericStatus: number | string
): PaymentStatus => {
  const statusMap: Record<number, PaymentStatus> = {
    0: PaymentStatus.Pending,
    1: PaymentStatus.Processing,
    2: PaymentStatus.Completed,
    3: PaymentStatus.CashOnDelivery,
    4: PaymentStatus.Failed,
    5: PaymentStatus.Cancelled,
    6: PaymentStatus.Refunded,
    7: PaymentStatus.Disputed,
  };

  if (typeof numericStatus === "string") return numericStatus as PaymentStatus;
  return statusMap[numericStatus] || PaymentStatus.Pending;
};

export { getShippingStatusString, getPaymentStatusString };
