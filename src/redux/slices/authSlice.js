import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Retrive user from local storage
const user = JSON.parse(localStorage.getItem("userInfo")) || null;

// check for an existing guest ID in the local storage or generate a new one
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

// Initial state
const initialState = {
  user: user,
  guestId: initialGuestId,
  isLoading: false,
  error: null,
};

// Fetch current user profile
// export const fetchUserProfile = createAsyncThunk(
//     "auth/fetchUserProfile",
//     async (_, { rejectWithValue }) => {
//       try {
//         const token = localStorage.getItem("userToken");

//         const response = await fetch(
//           `${import.meta.env.VITE_BACKED_URL}/api/users/profile`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch user profile");
//         }

//         const data = await response.json();
//         return data;
//       } catch (error) {
//         return rejectWithValue(error.message);
//       }
//     }
//   );


// Async thunk for user login
const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("userToken", data.token);
      console.log(data);
      return data; // Return the user object from the response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for user registration
const registration = createAsyncThunk(
  "auth/registration",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("userToken", data.token);
      return data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// verify otp
const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/users/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserFromToken = createAsyncThunk(
  "auth/fetchUserFromToken",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Unauthorized");

      const user = await response.json();
      localStorage.setItem("userInfo", JSON.stringify(user));
      return { ...user, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      state.guestId = `guest_${new Date().getTime()}`; //  new guest ID
      localStorage.setItem("guestId", state.guestId); // Store the new guest ID
    },
    generateNewGuestId: (state) => {
      const newGuestId = `guest_${new Date().getTime()}`;
      state.guestId = newGuestId;
      localStorage.setItem("guestId", newGuestId); // Store the new guest ID
    },
    setUserFromToken: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      localStorage.setItem("userInfo", JSON.stringify(user));
      localStorage.setItem("userToken", token);
      console.log("userToken", token);
    }    
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Set the user object in the state
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Set the error message in the state
      })
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
        state.user = null;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Set the user object in the state
      })
      .addCase(registration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Set the error message in the state
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally set something like: state.verified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    // .addCase(fetchUserProfile.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // })
    // .addCase(fetchUserProfile.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.user = action.payload;
    // })
    // .addCase(fetchUserProfile.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.user = null;
    //   localStorage.removeItem("userInfo");
    //   localStorage.removeItem("userToken");
    //   state.error = action.payload;
    // })
  },
});

export const { logout, generateNewGuestId, setUserFromToken } = authSlice.actions;
export { loginUser, registration, verifyOtp };
export default authSlice.reducer;
