import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import type { OrderItem } from "../../types/orders.types";
import {
  useDeleteOrderItemMutation,
  useUpdateOrderItemQuantityMutation,
} from "../../app/api/ordersApi";

interface OrderItemActionsProps {
  item: OrderItem;
}

export default function OrderItemActions({ item }: OrderItemActionsProps) {
  const [updateOrderItemQuantity, { isLoading: isUpdating }] =
    useUpdateOrderItemQuantityMutation();

  const [deleteOrderItem, { isLoading: isDeleting }] =
    useDeleteOrderItemMutation();

  const [pendingAction, setPendingAction] = useState<
    "increment" | "decrement" | "delete" | null
  >(null);

  const isLoading = isUpdating || isDeleting;

  const handleIncrement = async () => {
    if (isLoading) return;

    setPendingAction("increment");
    try {
      console.log("Incrementing quantity for item:", item);
      await updateOrderItemQuantity({
        Id: item.Id,
        Quantity: item.Quantity + 1,
        OrderId: item.OrderId,
        ProductId: item.ProductId,
      }).unwrap();
    } catch (error) {
      console.error("Failed to increment quantity:", error);
    } finally {
      setPendingAction(null);
    }
  };

  const handleDecrement = async () => {
    if (item.Quantity <= 1 || isLoading) return;

    setPendingAction("decrement");
    try {
      console.log("Decrementing quantity for item:", item);
      await updateOrderItemQuantity({
        Id: item.Id,
        Quantity: item.Quantity - 1,
        OrderId: item.OrderId,
        ProductId: item.ProductId,
      }).unwrap();
    } catch (error) {
      console.error("Failed to decrement quantity:", error);
    } finally {
      setPendingAction(null);
    }
  };

  const handleDelete = async () => {
    if (isLoading) return;

    if (!window.confirm("Are you sure you want to remove this item?")) {
      return;
    }

    setPendingAction("delete");
    try {
      // Pass both id and orderId for proper cache invalidation
      await deleteOrderItem({ id: item.Id, orderId: item.OrderId }).unwrap();
      setPendingAction(null);
    } catch (error) {
      console.error("Failed to delete order item:", error);
      setPendingAction(null);
    }
  };

  const buttonBaseClass = `
    relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-1 
    disabled:cursor-not-allowed disabled:opacity-50
  `;

  const incrementClass = `
    ${buttonBaseClass}
    text-green-700 bg-green-50 border border-green-200
    hover:bg-green-100 hover:border-green-300
    focus:ring-green-300
    disabled:hover:bg-green-50 disabled:hover:border-green-200
  `;

  const decrementClass = `
    ${buttonBaseClass}
    text-amber-700 bg-amber-50 border border-amber-200
    hover:bg-amber-100 hover:border-amber-300
    focus:ring-amber-300
    disabled:hover:bg-amber-50 disabled:hover:border-amber-200
    ${item.Quantity <= 1 ? "opacity-40 cursor-not-allowed" : ""}
  `;

  const deleteClass = `
    ${buttonBaseClass}
    text-red-700 bg-red-50 border border-red-200
    hover:bg-red-100 hover:border-red-300
    focus:ring-red-300
    disabled:hover:bg-red-50 disabled:hover:border-red-200
  `;

  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={handleIncrement}
        disabled={isLoading}
        className={incrementClass}
        title="Increase quantity"
      >
        {pendingAction === "increment" ? (
          <LoadingSpinner />
        ) : (
          <PlusIcon className="h-4 w-4" />
        )}
      </button>

      <span className="mx-2 px-2 py-1 text-sm font-semibold text-gray-700 bg-gray-100 rounded">
        {item.Quantity}
      </span>

      <button
        onClick={handleDecrement}
        disabled={isLoading || item.Quantity <= 1}
        className={decrementClass}
        title={
          item.Quantity <= 1 ? "Cannot decrease below 1" : "Decrease quantity"
        }
      >
        {pendingAction === "decrement" ? (
          <LoadingSpinner />
        ) : (
          <MinusIcon className="h-4 w-4" />
        )}
      </button>

      <button
        onClick={handleDelete}
        disabled={isLoading}
        className={deleteClass}
        title="Remove item"
      >
        {pendingAction === "delete" ? (
          <LoadingSpinner />
        ) : (
          <TrashIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

function LoadingSpinner({ size = "w-4 h-4" }: { size?: string }) {
  return (
    <div
      className={`${size} border-2 border-current border-t-transparent rounded-full animate-spin`}
    />
  );
}
