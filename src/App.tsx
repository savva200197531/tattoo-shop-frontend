import React from 'react'
import { storageFactory } from 'storage-factory'
import { BrowserRouter } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material'

import AppLayout from './AppLayout'
import { AuthProvider } from './contexts/auth/AuthContext'
import { ProductsProvider } from './contexts/products/ProductsContext'
import { CartProvider } from './contexts/cart/CartContext'
import { FavoriteProvider } from './contexts/favorite/FavoriteContext'
import { AlertProvider } from './contexts/alert/AlertContext'
import { PaymentProvider } from './contexts/payment/PaymentContext'
import { OrdersProvider } from './contexts/orders/OrdersContext'
import { SliderProvider } from './contexts/slider/SliderContext'
import { FilesProvider } from './contexts/files/FilesContext'

const theme = createTheme({
  palette: {
    secondary: {
      main: '#000',
    },
    primary: {
      main: '#FF8800',
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
                <OrdersProvider>
                  <PaymentProvider>
                    <FavoriteProvider>
                      <SliderProvider>
                        <FilesProvider>
                          <AppLayout />
                        </FilesProvider>
                      </SliderProvider>
                    </FavoriteProvider>
                  </PaymentProvider>
                </OrdersProvider>
              </ProductsProvider>
            </CartProvider>
          </AuthProvider>
        </AlertProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
