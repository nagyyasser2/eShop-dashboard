import { Routes, Route, Navigate } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import Layout from "../../components/layout/Layout";
import Dashboard from "../../components/Dashboard";
import Products from "../products/Products";
import Orders from "../orders/Orders";
import Customers from "../customers/Customers";
import Settings from "../settings/Settings";
import Categories from "../categories/Categories";
import Coupons from "../coupons/Coupons";
import Admins from "../admins/Admins";
import Payments from "../payments/Payments";

const ProtectedRoutes = () => {
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;
