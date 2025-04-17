import api from '@/lib/api';
import { useEffect, useState } from 'react';

interface Variation {
  id: string;
  name: string;
  // Agregar más campos según respuesta real del backend
}

export function useVariations() {
  const [variations, setVariations] = useState<Variation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchVariations() {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Variation[]>('variations');
      setVariations(response.data);
    } catch (err) {
      console.error(err);
      setError('Error al obtener variaciones');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVariations();
  }, []);

  return { variations, loading, error, refetch: fetchVariations };
}
