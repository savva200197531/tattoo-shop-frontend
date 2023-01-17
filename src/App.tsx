import React from 'react'

import { setAuthToken } from './helpers/setAuthToken'
import LogoutButton from './components/LogoutButton'

function App() {
  const token = localStorage.getItem('alisa-kisa-token');

  if (token) {
    setAuthToken(token);
  }

  return (
    <div>
      app
      <LogoutButton />
    </div>
  )
}

export default App
