/**
 * This is a "resource route". 
 * It doesn't render any UI; it just returns data. 
 * The useFetcher in SearchBar will call this route's loader.
 */

interface SearchResult {
  id: string;
  title: string;
  path: string;
}

// Dummy data for demonstration
const allItems: SearchResult[] = [
    { id: '1', title: 'React Router v7', path: '/items/react-router' },
    { id: '2', title: 'React Query', path: '/items/react-query' },
    { id: '3', title: 'Vite', path: '/items/vite' },
    { id: '4', title: 'TypeScript Best Practices', path: '/items/typescript' },
];

export async function apiSearchLoader({ request }: { request: Request }): Promise<Response> {
  const url = new URL(request.url);
  const q = url.searchParams.get('q')?.toLowerCase();

  if (!q) {
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  // In a real app, you'd fetch this from your backend API
  const filteredItems = allItems.filter(item => 
    item.title.toLowerCase().includes(q)
  );
  
  // Simulate network delay
  await new Promise(res => setTimeout(res, 300));
  
  return new Response(JSON.stringify(filteredItems), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}