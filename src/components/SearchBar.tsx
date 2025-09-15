/**
 * This component will manage its own state for the search query.
 * It will use react-router-dom's useFetcher hook to get live search suggestions.
 * And it will use a <Form> for navigating to a full search results page.
 */

// src/components/SearchBar.tsx
import React from 'react';
import { Form, useFetcher, Link } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  path: string;
}

export function SearchBar() {
  // this hook is for fetching the search suggestions without causing a navigation
  const fetcher = useFetcher<SearchResult[]>();

  // maange the visibility of the suggestions dropdown
  const [showResults, setShowResults] = React.useState(false);

  const formRef = React.useRef<HTMLFormElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Effect to close dropdown on outside click
  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {/* when the user hits Enter, it navigates to /search */}
      <Form
        ref={formRef}
        action="/search" 
        role="search"
        onSubmit={() => setShowResults(false)}
      >
        <input
          ref={inputRef}
          type="search"
          name="q"
          placeholder="Search..."
          aria-label="Search"
          onFocus={() => inputRef.current?.value && setShowResults(true)}
          // call fetcher.submit to a special API route to get suggestions as the user types
          onChange={(event) => {
            const query = event.currentTarget.value;
            if (query.length > 0) {
              fetcher.submit({ q: query }, { method: 'get', action: '/api/search' });
              setShowResults(true);
            } else {
              // Clear suggestions
              if (fetcher.data) {
                fetcher.submit(null, { method: 'get', action: '/api/search' });
              }
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
          {fetcher.state === 'loading' && <div style={{ padding: '0.5rem' }}>Searching...</div>}
          
          {fetcher.data && fetcher.data.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {fetcher.data.map((result) => (
                <li key={result.id} style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                  <Link 
                    to={result.path} 
                    onClick={() => {
                      setShowResults(false);
                      if (formRef.current) {
                        formRef.current.reset();
                      }
                    }}
                    style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                  >
                    {result.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {fetcher.data && fetcher.data.length === 0 && fetcher.state === 'idle' && (
             <div style={{ padding: '0.5rem' }}>No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}