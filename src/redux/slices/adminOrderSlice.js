import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
  "admin/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/admin/orders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      return data.orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return rejectWithValue(error.message);
    }
  }
);

// fetch order details by Id (admin only)
export const fetchOrderDetails = createAsyncThunk(
  "admin/fetchOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/admin/orders/${orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }
      const data = await response.json();
      return data.order;
    } catch (error) {
      console.error("Error fetching order details:", error);
      return rejectWithValue(error.message);
    }
  }
);

// update order status (admin only)
export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/admin/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      const data = await response.json();
      return data.order;
    } catch (error) {
      console.error("Error updating order status:", error);
      return rejectWithValue(error.message);
    }
  }
);

// delete order (admin only)
export const deleteOrder = createAsyncThunk(
  "admin/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/admin/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete order");
      }
      const data = await response.json();
      return data.order;
    } catch (error) {
      console.error("Error deleting order:", error);
      return rejectWithValue(error.message);
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;
        state.totalSales = action.payload.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        );
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        const orderIndex = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex] = action.payload;
        }
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const orderIndex = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        const orderIndex = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (orderIndex !== -1) {
          state.totalSales -= state.orders[orderIndex].totalPrice;
          state.orders.splice(orderIndex, 1);
          state.totalOrders -= 1;
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminOrderSlice.reducer;
