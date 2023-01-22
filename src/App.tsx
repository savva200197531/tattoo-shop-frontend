import React from 'react'

import { setAuthToken } from './helpers/setAuthToken'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/login/LoginPage'
import RegisterPage from './pages/auth/register/RegisterPage'
import AuthPage from './pages/auth/AuthPage'
import { AuthProvider } from './contexts/auth/AuthContext'
import ConfirmationPage from './pages/auth/confirmation/ConfirmationPage'
import { ProductsProvider } from './contexts/products/ProductsContext'
import { CartProvider } from './contexts/cart/CartContext'
import ProductsPage from './pages/products/ProductsPage'
import CartPage from './pages/cart/CartPage'
import Header from './components/header/Header'

function App() {
  const token = localStorage.getItem('alisa-kisa-token');

  if (token) {
    setAuthToken(token);
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ProductsProvider>
            <Header />
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route element={<AuthPage />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/confirmation/:token" element={<ConfirmationPage />} />
              </Route>
            </Routes>
          </ProductsProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
