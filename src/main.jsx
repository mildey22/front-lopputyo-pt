import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Trainings from './components/Trainings.jsx';
import Customers from './components/Customers.jsx';
import Error from './components/Error.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainApp />,
    errorElement: <Error />,
    children: [
      {
        element: <Trainings />,
        index: true
      },
      {
        path: "customers",
        element: <Customers />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
