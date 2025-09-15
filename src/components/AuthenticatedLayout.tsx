/**
 * This is a shared layout component used to display the SearchBar on every authenticated page.
 * This layout wraps all our authenticated routes.
 */

import { Outlet, Navigate, Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
// import { useAuth } from '../hooks/useAuth'; // Assuming you have an auth hook

export function AuthenticatedLayout() {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true; // Placeholder for your auth logic

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <nav>
          <Link to="/">Home</Link>
          {/* Other navigation links */}
        </nav>
        <SearchBar />
      </header>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
