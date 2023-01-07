import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RouteGuard from './components/RouteGuard'

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
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
