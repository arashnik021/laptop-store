import { Route, Routes } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

import AboutPage from "../pages/AboutPage";
import CartPage from "../pages/CartPage";
import CategoriesPage from "../pages/CategoriesPage";
import CategoryProductsPage from "../pages/CategoryProductsPage";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import WishlistPage from "../pages/WishlistPage";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />}/>
        <Route path="products" element={<ProductsPage />}/>
        <Route path="products/:id" element={<ProductDetailsPage />}/>
        <Route path="categories" element={<CategoriesPage />}/>
        <Route path="categories/:slug" element={<CategoryProductsPage />}/>
        <Route path="cart" element={<CartPage />}/>
        <Route path="wishlist" element={<WishlistPage />}/>
        <Route path="login" element={<LoginPage />}/>
        <Route path="register" element={<RegisterPage />}/>

        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="about" element={<AboutPage />}/>
        <Route path="contact" element={<ContactPage />}/>
        <Route path="*" element={<NotFoundPage />}/>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
