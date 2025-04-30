import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to create a checkout session
export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async (checkoutdata , { rejectWithValue }) => {
    console.log(checkoutdata);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          body: JSON.stringify(checkoutdata),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return rejectWithValue(error.message);
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default checkoutSlice.reducer;
