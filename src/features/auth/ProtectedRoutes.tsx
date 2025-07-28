import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import Layout from "../../components/layout/Layout";
import Dashboard from "../../components/Dashboard";
import Products from "../products/Products";
import CreateProductPage from "../products/pages/CreateProductPage";
import EditProductPage from "../products/pages/EditProductPage";
import Orders from "../orders/Orders";
import Customers from "../customers/Customers";
import Settings from "../settings/Settings";
import Categories from "../categories/Categories";
import Coupons from "../coupons/Coupons";
import Admins from "../admins/Admins";
import Payments from "../payments/Payments";
import Banners from "../banners/Banners";
import Discounts from "../discounts/Discounts";
import CreateProductVariantForm from "../products/components/CreateProductVariantForm";
import EditCategoryPage from "../categories/pages/EditCategoryPage";
import EditBannerPage from "../banners/pages/EditBannerPage";
import CreateBannerPage from "../banners/pages/CreateBannerPage";

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
        <Route path="/products/create" element={<CreateProductPage />} />
        <Route path="/products/:id/edit" element={<EditProductPage />} />
        <Route
          path="/products/:id/variants/create"
          element={<CreateProductVariantForm />}
        />
        <Route
          path="/products/:id/variants/edit/:variantId"
          element={<CreateProductVariantForm />}
        />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id/edit" element={<EditCategoryPage />} />
        <Route path="/categories/:id/subcategories" element={<Categories />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/banners" element={<Banners />} />
        <Route path="/banners/create" element={<CreateBannerPage />} />
        <Route path="/banners/:id/edit" element={<EditBannerPage />} />
        <Route path="/discounts" element={<Discounts />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;
