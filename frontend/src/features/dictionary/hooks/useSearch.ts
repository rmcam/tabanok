import api from '@/lib/api';
import { useState } from 'react';

interface SearchResult {
  id: string;
  word: string;
  definition: string;
  // Agregar más campos según respuesta real del backend
}

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function search(term: string) {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<SearchResult[]>('/search', {
        params: { q: term },
      });
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setError('Error al buscar');
    } finally {
      setLoading(false);
    }
  }

  return { results, loading, error, search };
}
