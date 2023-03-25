import React from 'react'
import { storageFactory } from 'storage-factory'
import { BrowserRouter } from 'react-router-dom'

import AppLayout from './AppLayout'
import AppProviders from './AppProviders'

export const local = storageFactory(() => localStorage)
export const session = storageFactory(() => sessionStorage)

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AppProviders>
        <AppLayout/>
      </AppProviders>
    </BrowserRouter>
  )
}

export default App
