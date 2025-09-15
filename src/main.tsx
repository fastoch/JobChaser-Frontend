import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthenticatedLayout } from './components/AuthenticatedLayout';
import { SearchResults, searchLoader } from './pages/SearchResults';
import { apiSearchLoader } from './api/search';

// Placeholder pages
const LoginPage = () => <h2>Login Page</h2>;
const HomePage = () => <h2>Home Page</h2>;
const ItemPage = () => <h2>Item Page</h2>;

/**
 * Our router setup defines which pages use the AuthenticatedLayout (and thus show the SearchBar)
 */
const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <AuthenticatedLayout />,
    // We could add a loader here to protect all child routes
    // loader: checkAuthLoader,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/search',
        element: <SearchResults />,
        loader: searchLoader,
      },
      {
        path: '/items/:id',
        element: <ItemPage />,
      },
      // ... other authenticated routes
    ],
  },
  // Resource route for search suggestions
  {
    path: '/api/search',
    loader: apiSearchLoader,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
