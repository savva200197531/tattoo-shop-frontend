import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ProductsPage from './pages/products/ProductsPage'
import CartPage from './pages/cart/CartPage'
import ProfilePage from './pages/profile/ProfilePage'
import FavoritePage from './pages/favorite/FavoritePage'
import AdminGuard from './guards/AdminGuard'
import AdminPage from './pages/admin/AdminPage'
import AuthPage from './pages/auth/AuthPage'
import LoginPage from './pages/auth/login/LoginPage'
import RegisterPage from './pages/auth/register/RegisterPage'
import ConfirmationPage from './pages/auth/confirmation/ConfirmationPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/favorite" element={<FavoritePage />} />
      <Route
        path="/admin"
        element={(
          <AdminGuard>
            <AdminPage />
          </AdminGuard>
        )}
      />
      <Route element={<AuthPage />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/confirmation/:token" element={<ConfirmationPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
