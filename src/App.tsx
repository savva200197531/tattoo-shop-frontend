import React from 'react'
import axios from 'axios'

export const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  else
    delete axios.defaults.headers.common["Authorization"];
}

function App() {
  // const bearer = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbG9uQGdtYWlsLmNvbSIsImlhdCI6MTY3MTg4NjE4OCwiZXhwIjoxNzAzNDIyMTg4fQ.58a44ZiLCR-8lo0E6g7mF3rEKFjMcRHGS4HC818ofX8'
  //
  // const auth = () => {
  //   axios.post('http://localhost:3001/auth/login', {
  //     "email": "elon@gmail.com",
  //     "password": "12345678"
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // }
  //
  // const refresh = () => {
  //   axios.post('http://localhost:3001/auth/refresh', {}, {
  //     headers: {
  //       Authorization: `Bearer ${bearer}`
  //     }
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // }

  const token = localStorage.getItem('alisa-kisa-token');

  if (token) {
    setAuthToken(token);
  }

  return (
    <div>
      app
    </div>
  )
}

export default App
