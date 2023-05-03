import React from 'react'

import Header from './layout/header/Header'
import AppRoutes from './AppRoutes'
import Footer from './layout/footer/Footer'
import AppAlert from './components/AppAlert/AppAlert'
import AppHiddenNiger from './AppHiddenNiger'

const AppLayout = () => {
  return (
    <>
      <Header />
      <AppRoutes />
      <AppAlert />
      <AppHiddenNiger />
      <Footer />
    </>
  )
}

export default AppLayout
