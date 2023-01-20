import React from 'react'

import { setAuthToken } from './helpers/setAuthToken'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/login/LoginPage'
import RegisterPage from './pages/auth/register/RegisterPage'
import AuthPage from './pages/auth/AuthPage'
import { AuthProvider } from './contexts/auth/AuthContext'
import ConfirmationPage from './pages/auth/confirmation/ConfirmationPage'
import RouteGuard from './components/RouteGuard'
import MainPage from './pages/main/MainPage'
import { ProductsProvider } from './contexts/products/ProductsContext'
import { CartProvider } from './contexts/cart/CartContext'

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
            <Routes>
              <Route path="/" element={
                <RouteGuard>
                  <MainPage />
                </RouteGuard>
              }></Route>
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
