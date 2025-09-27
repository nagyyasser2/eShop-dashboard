import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Order,
  OrderItem,
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from "../../types/orders.types";
import { API_BASE_URL } from "../../utils/constants";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Order", "OrderItem"],
  endpoints: (builder) => ({
    // ==================== ORDERS ENDPOINTS ====================

    /**
     * Get all orders
     */
    getOrders: builder.query<Order[], void>({
      query: () => "orders",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Order" as const, id })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),

    /**
     * Get order by ID
     */
    getOrderById: builder.query<Order, number>({
      query: (id) => `orders/${id}`,
      providesTags: (result, error, id) => [
        { type: "Order", id },
        { type: "Order", id: "LIST" },
      ],
    }),

    /**
     * Update order status
     */
    updateOrderStatus: builder.mutation<
      Order,
      { id: number; shippingStatus: string; paymentStatus: string }
    >({
      query: ({ id, shippingStatus, paymentStatus }) => ({
        url: `orders/${id}/status?shippingStatus=${shippingStatus}&paymentStatus=${paymentStatus}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Order", id },
        { type: "Order", id: "LIST" },
      ],
    }),

    /**
     * Delete order
     */
    deleteOrder: builder.mutation<void, number>({
      query: (id) => ({
        url: `orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Order", id },
        { type: "Order", id: "LIST" },
      ],
    }),

    // ==================== ORDER ITEMS ENDPOINTS ====================

    /**
     * Create order item
     */
    createOrderItem: builder.mutation<OrderItem, CreateOrderItemDto>({
      query: (orderItemDto) => ({
        url: "orderitems",
        method: "POST",
        body: orderItemDto,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "OrderItem", id: "LIST" },
        { type: "Order", id: arg.orderId },
        { type: "Order", id: "LIST" },
      ],
    }),

    /**
     * Get order item by ID
     */
    getOrderItemById: builder.query<OrderItem, number>({
      query: (id) => `orderitems/${id}`,
      providesTags: (result, error, id) => [{ type: "OrderItem", id }],
    }),

    /**
     * Get order items by order ID
     */
    getOrderItemsByOrderId: builder.query<OrderItem[], number>({
      query: (orderId) => `orderitems/order/${orderId}`,
      providesTags: (result, error, orderId) => [
        ...(result?.map(({ id }) => ({ type: "OrderItem" as const, id })) ??
          []),
        { type: "OrderItem", id: "LIST" },
        { type: "OrderItem", id: `ORDER_${orderId}` },
        { type: "Order", id: orderId }, // Also provide the order tag
      ],
    }),

    /**
     * Update order item quantity
     */
    updateOrderItemQuantity: builder.mutation<OrderItem, UpdateOrderItemDto>({
      query: (updateOrderItemDto) => ({
        url: "orderitems",
        method: "PUT",
        body: updateOrderItemDto,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "OrderItem", id: arg.id },
        { type: "OrderItem", id: "LIST" },
        { type: "OrderItem", id: `ORDER_${arg.orderId}` },
        { type: "Order", id: arg.orderId }, // This will now properly invalidate the order
        { type: "Order", id: "LIST" },
      ],
    }),

    /**
     * Delete order item
     */
    deleteOrderItem: builder.mutation<void, { id: number; orderId: number }>({
      query: ({ id }) => ({
        url: `orderitems/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id, orderId }) => [
        { type: "OrderItem", id },
        { type: "OrderItem", id: "LIST" },
        { type: "OrderItem", id: `ORDER_${orderId}` },
        { type: "Order", id: orderId }, // This will now properly invalidate the order
        { type: "Order", id: "LIST" },
      ],
    }),
  }),
});

// Export all hooks
export const {
  // Orders hooks
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,

  // Order items hooks
  useCreateOrderItemMutation,
  useGetOrderItemByIdQuery,
  useGetOrderItemsByOrderIdQuery,
  useUpdateOrderItemQuantityMutation,
  useDeleteOrderItemMutation,
} = ordersApi;
