import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.scss';
import App from './App';
import LoginPage from './pages/login/LoginPage'
import RouteGuard from './components/RouteGuard'
import RegisterPage from './pages/register/RegisterPage'
import ConfirmationPage from './pages/confirmation/ConfirmationPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteGuard>
        <App />
      </RouteGuard>
    ),
  },
  {
    path: "/login",
    element: (
      <LoginPage />
    ),
  },
  {
    path: "/register",
    element: (
      <RegisterPage />
    ),
  },
  {
    path: "/confirm/:token",
    element: (
      <ConfirmationPage />
    ),
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
