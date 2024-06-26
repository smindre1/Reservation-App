import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Portal from './pages/Portal.jsx';
import Employees from './pages/Employees.jsx';
import Profile from './pages/Profile.jsx';
import Reservation from './pages/Reservation.jsx';
import Reservations from './pages/Reservations.jsx';
import Settings from './pages/Settings.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login-or-signup',
        element: <Portal />
      }, {
          path: '/employee-roster',
          element: <Employees />
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/reservations',
        element: <Reservations />
      }, {
        path: '/reservations/:reservationId',
        element: <Reservation />
      }, {
        path: '/settings',
        element: <Settings />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)