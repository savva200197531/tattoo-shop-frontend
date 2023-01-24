import React from 'react'
import { storageFactory } from 'storage-factory'

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
import Header from './layout/header/Header'
import ProfilePage from './pages/profile/ProfilePage'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
    secondary: {
      main: '#000',
    },
    primary: {
      main: '#000',
    },
  },
})

export const local = storageFactory(() => localStorage)
export const session = storageFactory(() => sessionStorage)

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CartProvider>
            <ProductsProvider>
              <Header />
              <Routes>
                <Route path="/" element={<ProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route element={<AuthPage />}>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/confirmation/:token" element={<ConfirmationPage />} />
                </Route>
              </Routes>
            </ProductsProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
