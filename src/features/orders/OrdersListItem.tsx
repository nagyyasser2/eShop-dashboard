import {
  PaymentStatus,
  ShippingStatus,
  type Order,
} from "../../types/orders.types";
import { useState, useEffect } from "react";
import {
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} from "../../app/api/ordersApi";
import {
  getPaymentStatusString,
  getShippingStatusString,
} from "./orders.utils";
import OrderUserPopup from "./OrderUserPopup";
import OrdersItemsPopup from "./OrdersItemsPopup";
import { TrashIcon } from "@heroicons/react/24/outline";

interface OrdersListItemProps {
  order: Order;
}

export default function OrdersListItem({ order }: OrdersListItemProps) {
  const [shippingStatus, setShippingStatus] = useState<ShippingStatus>(
    getShippingStatusString(order.shippingStatus)
  );
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(
    getPaymentStatusString(order.paymentStatus)
  );

  const [isOrderUserPopupOpen, setIsOrderUserPopupOpen] = useState(false);
  const [isOrdersItemsPopupOpen, setIsOrderItemsPopupOpen] = useState(false);

  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  const toggleOrderItemsPopup = () => {
    setIsOrderItemsPopupOpen(!isOrdersItemsPopupOpen);
  };

  const toggleOrderUserPopup = () => {
    setIsOrderUserPopupOpen(!isOrderUserPopupOpen);
  };

  // Update local state when order prop changes (after API updates)
  useEffect(() => {
    setShippingStatus(getShippingStatusString(order.shippingStatus));
    setPaymentStatus(getPaymentStatusString(order.paymentStatus));
  }, [order.shippingStatus, order.paymentStatus]);

  // Helpers to get enum values as arrays
  const shippingOptions = Object.values(ShippingStatus);
  const paymentOptions = Object.values(PaymentStatus);

  const handleShippingChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value as ShippingStatus;
    const previousValue = shippingStatus;
    setShippingStatus(value);

    try {
      await updateOrderStatus({
        id: order.id,
        shippingStatus: value,
        paymentStatus: paymentStatus,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update shipping status:", error);
      // Revert on error
      setShippingStatus(previousValue);
    }
  };

  const handlePaymentChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value as PaymentStatus;
    const previousValue = paymentStatus;
    setPaymentStatus(value);

    try {
      await updateOrderStatus({
        id: order.id,
        shippingStatus: shippingStatus,
        paymentStatus: value,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update payment status:", error);
      // Revert on error
      setPaymentStatus(previousValue);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete order #${order.orderNumber}? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      await deleteOrder(order.id).unwrap();
    } catch (error) {
      console.error("Failed to delete order:", error);
      alert("Failed to delete order. Please try again.");
    }
  };

  const isLoading = isUpdating || isDeleting;

  return (
    <tr className={isLoading ? "opacity-50" : ""}>
      {/* Order Number */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        #{order.orderNumber}
      </td>

      {/* Customer Name */}
      <td
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 underline cursor-pointer hover:text-blue-600"
        onClick={toggleOrderUserPopup}
      >
        {order.user
          ? `${order.user.firstName} ${order.user.lastName}`
          : `${order.shippingFirstName} ${order.shippingLastName}`}
      </td>

      {/* Total Amount - This should now update when items change */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
        ${order.totalAmount?.toFixed(2) || "0.00"}
      </td>

      {/* Shipping Status Dropdown */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        <select
          value={shippingStatus}
          onChange={handleShippingChange}
          disabled={isLoading}
          className={`border rounded px-2 py-1 text-sm ${
            isLoading ? "cursor-not-allowed bg-gray-100" : "cursor-pointer"
          }`}
        >
          {shippingOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </td>

      {/* Payment Status Dropdown */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        <select
          value={paymentStatus}
          onChange={handlePaymentChange}
          disabled={isLoading}
          className={`border rounded px-2 py-1 text-sm ${
            isLoading ? "cursor-not-allowed bg-gray-100" : "cursor-pointer"
          }`}
        >
          {paymentOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <button
          className="cursor-pointer border px-4 py-1 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={toggleOrderItemsPopup}
          disabled={isLoading}
        >
          Show Items
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
          title="Delete order"
        >
          <TrashIcon className="h-5 w-5 text-red-500 hover:text-red-700 cursor-pointer" />
        </button>
      </td>

      {/* Popups */}
      <OrderUserPopup
        user={order?.user}
        isOpen={isOrderUserPopupOpen}
        toggleOrderUserPopup={toggleOrderUserPopup}
      />
      <OrdersItemsPopup
        orderId={order.id}
        isOpen={isOrdersItemsPopupOpen}
        toggleOrderItemsPopup={toggleOrderItemsPopup}
      />
    </tr>
  );
}
