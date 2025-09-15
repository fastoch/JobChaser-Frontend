import { useQuery } from '@tanstack/react-query';
import type { SearchResult } from '../shared/types';

const fetchSearchSuggestions = async (query: string): Promise<SearchResult[]> => {
  if (!query) {
    return [];
  }
  // In a real app, you'd fetch from your API
  // For example:
  // const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  // if (!response.ok) {
  //   throw new Error('Network response was not ok');
  // }
  // return response.json();

  // For demonstration purposes, we'll use mock data with a delay.
  console.log(`Fetching suggestions for: ${query}`);
  await new Promise(resolve => setTimeout(resolve, 300));
  const mockData: SearchResult[] = [
    { id: '1', title: `Job: React Developer in "${query}"`, path: `/jobs/1` },
    { id: '2', title: `Company: "${query}" Inc.`, path: `/companies/2` },
    { id: '3', title: `Article: Getting a job with "${query}" skills`, path: `/articles/3` },
  ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

  return mockData;
};

export const useSearchSuggestions = (query: string) => {
  return useQuery({
    queryKey: ['search-suggestions', query],
    queryFn: () => fetchSearchSuggestions(query),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};