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
              ...result.map(({ Id }) => ({ type: "Order" as const, Id })),
              { type: "Order", Id: "LIST" },
            ]
          : [{ type: "Order", Id: "LIST" }],
    }),

    /**
     * Get order by ID
     */
    getOrderById: builder.query<Order, number>({
      query: (id) => `orders/${id}`,
      providesTags: (result, error, id) => [
        { type: "Order", Id: id },
        { type: "Order", Id: "LIST" },
      ],
    }),

    updateOrderStatus: builder.mutation<
      Order,
      { id: number; shippingStatus: string; paymentStatus: string }
    >({
      query: ({ id, shippingStatus, paymentStatus }) => ({
        url: `orders/${id}/status?shippingStatus=${shippingStatus}&paymentStatus=${paymentStatus}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Order", Id: id }, // Changed from 'id' to 'Id'
        { type: "Order", Id: "LIST" },
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
        { type: "Order", Id: id }, // Changed from 'id' to 'Id' to match your tags
        { type: "Order", Id: "LIST" },
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
        { type: "OrderItem", Id: "LIST" },
        { type: "Order", Id: arg.OrderId },
        { type: "Order", Id: "LIST" },
      ],
    }),

    /**
     * Get order item by ID
     */
    getOrderItemById: builder.query<OrderItem, number>({
      query: (id) => `orderitems/${id}`,
      providesTags: (result, error, id) => [{ type: "OrderItem", Id: id }],
    }),

    /**
     * Get order items by order ID
     */
    getOrderItemsByOrderId: builder.query<OrderItem[], number>({
      query: (orderId) => `orderitems/order/${orderId}`,
      providesTags: (result, error, orderId) => [
        ...(result?.map(({ Id }) => ({ type: "OrderItem" as const, Id })) ??
          []),
        { type: "OrderItem", Id: "LIST" },
        { type: "OrderItem", Id: `ORDER_${orderId}` },
        { type: "Order", Id: orderId }, // Also provide the order tag
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
        { type: "OrderItem", Id: arg.Id },
        { type: "Order", Id: arg.OrderId },
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
        { type: "OrderItem", Id: id },
        { type: "OrderItem", Id: "LIST" },
        { type: "OrderItem", Id: `ORDER_${orderId}` },
        { type: "Order", Id: orderId },
        { type: "Order", Id: "LIST" },
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
