import api from '@/lib/api';
import { useState } from 'react';

interface DictionaryEntry {
  entrada: string;
  definicion: string;
  ejemplos: string[];
}

interface SearchResult {
  id: string;
  entrada: string;
  definicion: string;
  ejemplos: string[];
}

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function search(term: string) {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<{ entry: DictionaryEntry | null }>('/dictionary/search', {
        params: { q: term },
      });

      if (response.data.entry) {
        const { entrada, definicion, ejemplos } = response.data.entry;
        setResults([{
          id: entrada,
          entrada: entrada,
          definicion: definicion,
          ejemplos: ejemplos || []
        }]);
      } else {
        setResults([]); // No results found
      }
    } catch (err) {
      console.error(err);
      setError('Error al buscar');
    } finally {
      setLoading(false);
    }
  }

  return { results, loading, error, search };
}
