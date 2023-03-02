import React from 'react'

import Header from './layout/header/Header'
import AppRoutes from './AppRoutes'
import Footer from './layout/footer/Footer'
import AppAlert from './components/AppAlert/AppAlert'

const AppLayout = () => {
  return (
    <>
      <Header />
      <AppRoutes />
      <AppAlert />
      <Footer />
    </>
  )
}

export default AppLayout
