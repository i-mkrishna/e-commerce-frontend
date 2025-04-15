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

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* User Layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections/:collection" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation" element={<OrderConfirmation />} />
          <Route path="/order/:id" element={<OrderDetailsPage />} />
          <Route path="/my-order" element={<MyOrderPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>{/* Admin Layout */}
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<UserManagment />} />
          <Route path="products" element={<ProductManagment />} />
          <Route path="products/:id/edit" element={<EditProductPage />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
