import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ProductsPage from './pages/products/ProductsPage'
import CartPage from './pages/cart/CartPage'
import ProfilePage from './pages/profile/ProfilePage'
import TabFavorite from './pages/profile/favorite/TabFavorite'
import AdminGuard from './guards/AdminGuard'
import AdminPage from './pages/admin/AdminPage'
import AuthPage from './pages/auth/AuthPage'
import LoginPage from './pages/auth/login/LoginPage'
import RegisterPage from './pages/auth/register/RegisterPage'
import ConfirmationPage from './pages/auth/confirmation/ConfirmationPage'
import MainPage from './pages/main/MainPage'
import ProductPage from './pages/product/ProductPage'
import OrderPage from './pages/order/OrderPage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import TabSlider from './pages/admin/slider/TabSlider'
import TabOrders from './pages/profile/orders/TabOrders'
import TabInfo from './pages/profile/info/TabInfo'
import ThanksPage from './pages/thanks/ThanksPage'
import TabCategories from './pages/admin/categories/TabCategories'
import TabBrands from './pages/admin/brands/TabBrands'
import CatalogPage from './pages/catalog/CatalogPage'
import Filters from './components/Filters/Filters'
import ProductItem from './pages/products/ProductItem'
import AdminProductItem from './pages/admin/products/ProductItem'
import CreateProduct from './pages/admin/products/CreateProduct'
import NotFoundPage from './pages/notFound/NotFoundPage'
import AdminTabOrders from './pages/admin/orders/AdminTabOrders'
import TabContacts from './pages/profile/contacts/TabContacts'
import TabAboutDelivery from './pages/profile/aboutDelivery/TabAboutDelivery'
import TabAboutPay from './pages/profile/aboutPay/TabAboutPay'
import TabAbout from './pages/profile/about/TabAbout'
import TabColors from './pages/admin/colors/TabColors'
import TabAmount from './pages/admin/amount/TabAmount'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<NotFoundPage />} />
      <Route path="/" element={<MainPage/>}/>
      <Route
        path="/products"
        element={(
          <ProductsPage
            ProductItem={ProductItem}
            Filters={Filters}
          />
        )}
      />
      <Route path="/products/:id" element={<ProductPage/>}/>
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/catalog" element={<CatalogPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}>
        <Route path="/profile/info" element={<TabInfo/>}/>
        <Route path="/profile/orders" element={<TabOrders/>}/>
        <Route path="/profile/favorite" element={<TabFavorite/>}/>
        <Route path="/profile/about" element={<TabAbout/>}/>
        <Route path="/profile/about-pay" element={<TabAboutPay/>}/>
        <Route path="/profile/about-delivery" element={<TabAboutDelivery/>}/>
        <Route path="/profile/contacts" element={<TabContacts/>}/>
      </Route>
      <Route path="/orders/:id" element={<OrderPage/>}/>
      <Route path="/checkout" element={<CheckoutPage/>}/>
      <Route path="/thanks/:id" element={<ThanksPage/>}/>
      <Route
        path="/admin"
        element={(
          <AdminGuard>
            <AdminPage/>
          </AdminGuard>
        )}
      >
        <Route
          path="/admin/products"
          element={
            <ProductsPage
              ProductItem={AdminProductItem}
              Filters={Filters}
              CreateProduct={CreateProduct}
            />
          }
        />
        <Route path="/admin/slider" element={<TabSlider/>}/>
        <Route path="/admin/categories" element={<TabCategories/>}/>
        <Route path="/admin/brands" element={<TabBrands/>}/>
        <Route path="/admin/colors" element={<TabColors/>}/>
        <Route path="/admin/amount" element={<TabAmount/>}/>
        {/*<Route path="/admin/quantity" element={<TabBrands/>}/>*/}
        <Route path="/admin/orders" element={<AdminTabOrders/>}/>
      </Route>
      <Route element={<AuthPage/>}>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Route>
      <Route path="/confirmation/:token" element={<ConfirmationPage/>}/>
    </Routes>
  )
}

export default AppRoutes
