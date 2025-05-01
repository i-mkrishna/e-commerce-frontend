import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./components/Pages/Home.jsx";
import { Toaster } from "sonner";
import Login from "./components/Pages/Login.jsx";
import Register from "./components/Pages/Register.jsx";
import Profile from "./components/Pages/Profile.jsx";
import CollectionPage from "./components/Pages/CollectionPage.jsx";
import ProductDetails from "./components/Products/ProductDetails.jsx";
import Checkout from "./components/Cart/Checkout.jsx";
import OrderConfirmation from "./components/Pages/OrderConfirmation.jsx";
import MyOrderPage from "./components/Pages/MyOrderPage.jsx";
import OrderDetailsPage from "./components/Pages/OrderDetailsPage.jsx";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import AdminHomePage from "./components/Pages/AdminHomePage.jsx";
import UserManagment from "./components/Admin/UserManagment.jsx";
import ProductManagment from "./components/Admin/ProductManagment.jsx";
import EditProductPage from "./components/Admin/EditProductPage.jsx";
import OrderManagement from "./components/Admin/OrderManagement.jsx";
import VerifyOtp from "./components/Pages/VerifyOtp.jsx";

import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import ProtectedRoutes from "./components/Common/ProtectedRoutes.jsx";
import GoogleAuthSuccess from "./components/Pages/GoogleAuthSuccess.jsx";
import { useEffect } from "react";

// const token = localStorage.getItem("token");

// if (token) {
//   fetch("/api/users/profile", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       // Set user in global state / context
//     })
//     .catch((err) => {
//       console.error("Token invalid or expired", err);
//       localStorage.removeItem("token");
//     });
// }

const App = () => {


  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          {/* User Layout */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verify" element={<VerifyOtp />} />
            <Route path="profile" element={<Profile />} />
            <Route path="collections/:collection" element={<CollectionPage />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-confirmation" element={<OrderConfirmation />} />
            <Route path="/order/:id" element={<OrderDetailsPage />} />
            <Route path="/my-orders" element={<MyOrderPage />} />
          </Route>

          <Route path="/google/success" element={<GoogleAuthSuccess />} />

          {/* Admin Layout */}
          <Route path="/admin" element={<ProtectedRoutes role="admin">
            <AdminLayout />
          </ProtectedRoutes>}>

            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagment />} />
            <Route path="products" element={<ProductManagment />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
