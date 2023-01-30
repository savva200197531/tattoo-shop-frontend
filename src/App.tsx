import React from 'react'
import { storageFactory } from 'storage-factory'
import { BrowserRouter } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material'

import { AuthProvider } from './contexts/auth/AuthContext'
import { ProductsProvider } from './contexts/products/ProductsContext'
import { CartProvider } from './contexts/cart/CartContext'
import { FavoriteProvider } from './contexts/favorite/FavoriteContext'
import { AlertProvider } from './contexts/alert/AlertContext'
import AppLayout from './AppLayout'

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
        <AlertProvider>
          <AuthProvider>
            <CartProvider>
              <ProductsProvider>
                <FavoriteProvider>
                  <AppLayout />
                </FavoriteProvider>
              </ProductsProvider>
            </CartProvider>
          </AuthProvider>
        </AlertProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
