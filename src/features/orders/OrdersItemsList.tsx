import type { OrderItem } from "../../types/orders.types";
import OrdersItemsListItem from "./OrdersItemsListItem";

interface OrdersItemsListProps {
  items: OrderItem[];
}

export default function OrdersItemsList({ items }: OrdersItemsListProps) {
  return (
    <ul className="list-disc pl-5">
      {items.map((item) => (
        <OrdersItemsListItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
