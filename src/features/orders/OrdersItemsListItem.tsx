import type { OrderItem } from "../../types/orders.types";
import OrderItemActions from "./OrderItemActions";

interface OrdersItemsListItemProps {
  item: OrderItem;
}

export default function OrdersItemsListItem({
  item,
}: OrdersItemsListItemProps) {
  return (
    <li
      className={`
        flex items-center justify-between p-3 border-b border-gray-200 
        transition-all duration-200 ease-in-out
       
      `}
    >
      <div className="flex items-center space-x-3">
        <div className={`transition-opacity duration-200 `}>
          <p className="text-sm font-medium text-gray-900">
            {item.ProductName}
          </p>
          <p className="text-xs text-gray-500">
            {item.Quantity} × ${item.UnitPrice.toFixed(2)} = $
            {(item.Quantity * item.UnitPrice).toFixed(2)}
          </p>
        </div>
      </div>
      <OrderItemActions item={item} />
    </li>
  );
}
