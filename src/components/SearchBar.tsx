/**
 * This component will manage its own state for the search query.
 * It will use react-router-dom's useFetcher hook to get live search suggestions.
 * And it will use a <Form> for navigating to a full search results page.
 */

// src/components/SearchBar.tsx
import { useEffect, useRef } from 'react';
import { Form, Link } from 'react-router-dom';
import { useSearchStore } from '../stores/useSearchStore';
import { useSearchSuggestions } from '../api/useSearchSuggestions';

export function SearchBar() {
  const { query, showResults, setQuery, setShowResults, reset } = useSearchStore();
  const { data: suggestions, isLoading, isSuccess } = useSearchSuggestions(query);

  const formRef = useRef<HTMLFormElement>(null);

  // Effect to close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [setShowResults]);

  const handleReset = () => {
    reset();
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* when the user hits Enter, it navigates to /search */}
      <Form ref={formRef} action="/search" role="search" onSubmit={handleReset}>
        <input
          type="search"
          name="q"
          placeholder="Search..."
          aria-label="Search"
          value={query}
          onFocus={() => query && setShowResults(true)}
          onChange={(event) => {
            const newQuery = event.currentTarget.value;
            setQuery(newQuery);
            if (newQuery.length > 0) {
              setShowResults(true);
            } else {
              setShowResults(false);
            }
          }}
        />
      </Form>

      {showResults && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginTop: '4px',
          zIndex: 1000,
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {isLoading && <div style={{ padding: '0.5rem' }}>Searching...</div>}
          
          {isSuccess && suggestions && suggestions.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {suggestions.map((result) => (
                <li key={result.id} style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                  <Link 
                    to={result.path} 
                    onClick={handleReset}
                    style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                  >
                    {result.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {isSuccess && suggestions && suggestions.length === 0 && (
             <div style={{ padding: '0.5rem' }}>No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}