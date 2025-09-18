import { apiSearchLoader } from './api/search';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthenticatedLayout } from './components/AuthenticatedLayout';
import { SearchResults, searchLoader } from './pages/SearchResults';
import Signin from './pages/Signin';
import Home from './pages/Home';

function App() {
  /**
   * Our router setup defines which pages use the AuthenticatedLayout (and thus show the SearchBar)
   */
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Signin />,
    },
    {
      element: <AuthenticatedLayout />,
      // We could add a loader here to protect all child routes
      // loader: checkAuthLoader,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/search',
          element: <SearchResults />,
          loader: searchLoader,
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

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
