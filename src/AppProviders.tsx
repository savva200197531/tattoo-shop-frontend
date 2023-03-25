import React, { ReactNode } from 'react'
import { AlertProvider } from './contexts/alert/AlertContext'
import { AuthProvider } from './contexts/auth/AuthContext'
import { ProductsProvider } from './contexts/products/ProductsContext'
import { CartProvider } from './contexts/cart/CartContext'
import { OrdersProvider } from './contexts/orders/OrdersContext'
import { PaymentProvider } from './contexts/payment/PaymentContext'
import { FavoriteProvider } from './contexts/favorite/FavoriteContext'
import { SliderProvider } from './contexts/slider/SliderContext'
import { FilesProvider } from './contexts/files/FilesContext'
import { CategoriesProvider } from './contexts/productsFilters/CategoriesContext/CategoriesContext'
import { BrandsProvider } from './contexts/productsFilters/BrandsContext/BrandsContext'
import { ColorsProvider } from './contexts/productsFilters/ColorsContext/ColorsContext'
import { AmountProvider } from './contexts/productsFilters/AmountContext/AmountContext'
import { createTheme, ThemeProvider } from '@mui/material'

type Props = {
  children: ReactNode
}

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

const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <AlertProvider>
        <AuthProvider>
          <ProductsProvider>
            <CartProvider>
              <OrdersProvider>
                <PaymentProvider>
                  <FavoriteProvider>
                    <SliderProvider>
                      <FilesProvider>
                        <CategoriesProvider>
                          <BrandsProvider>
                            <ColorsProvider>
                              <AmountProvider>
                                {children}
                              </AmountProvider>
                            </ColorsProvider>
                          </BrandsProvider>
                        </CategoriesProvider>
                      </FilesProvider>
                    </SliderProvider>
                  </FavoriteProvider>
                </PaymentProvider>
              </OrdersProvider>
            </CartProvider>
          </ProductsProvider>
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  )
}

export default AppProviders
