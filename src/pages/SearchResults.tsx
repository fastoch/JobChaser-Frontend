import { useLoaderData } from 'react-router-dom';

interface FullSearchResult {
  id: string;
  title: string;
  description: string;
}

export async function searchLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  
  if (!q) {
    return { results: [], query: '' };
  }

  // In a real app, you'd fetch this from your backend API
  console.log(`Fetching full search results for: "${q}"`);
  // const response = await fetch(`https://your-api.com/search?q=`);
  // const results = await response.json();
  
  // Dummy results
  const results: FullSearchResult[] = [
    { id: '1', title: `Full result for  1`, description: 'Description 1' },
    { id: '2', title: `Full result for  2`, description: 'Description 2' },
  ];

  return { results, query: q };
}

export function SearchResults() {
  const { results, query } = useLoaderData() as { results: FullSearchResult[], query: string };

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {results.length > 0 ? (
        <ul>
          {results.map(result => (
            <li key={result.id}>
              <h2>{result.title}</h2>
              <p>{result.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
}
