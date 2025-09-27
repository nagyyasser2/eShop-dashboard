import { useGetOrderItemsByOrderIdQuery } from "../../app/api/ordersApi";
import OrdersItemsListItem from "./OrdersItemsListItem";

interface OrdersItemsPopupProps {
  orderId: number;
  isOpen: boolean;
  toggleOrderItemsPopup: () => void;
}

export default function OrdersItemsPopup({
  orderId,
  isOpen,
  toggleOrderItemsPopup,
}: OrdersItemsPopupProps) {
  const {
    data: orderItems,
    isLoading,
    error,
  } = useGetOrderItemsByOrderIdQuery(orderId);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm transition-opacity duration-150 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={toggleOrderItemsPopup}
      role="dialog"
      aria-labelledby="order-items-title"
      aria-modal="true"
    >
      <div
        className={`relative bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl transform transition-all duration-300 ease-out ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 transition-colors"
          onClick={toggleOrderItemsPopup}
          aria-label="Close order items"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="space-y-6">
          <h3
            id="order-items-title"
            className="text-2xl font-semibold text-gray-900 tracking-tight"
          >
            Order Items
          </h3>
          {isLoading && <div className="text-gray-700 text-sm">Loading...</div>}
          {error && (
            <div className="text-red-600 text-sm">
              {"data" in error
                ? (error as any).data
                : (error as any).message || "An error occurred"}
            </div>
          )}
          {orderItems && (
            <ul className="space-y-4">
              {orderItems.map((item) => (
                <OrdersItemsListItem key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
