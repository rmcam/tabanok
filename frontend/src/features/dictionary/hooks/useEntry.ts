import { useState } from 'react';
import api from '@/lib/api';

interface Entry {
  id: string;
  word: string;
  definition: string;
  // Agregar más campos según respuesta real del backend
}

export function useEntry() {
  const [entry, setEntry] = useState<Entry | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchEntry(id: string) {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Entry>(`/api/entry/${id}`);
      setEntry(response.data);
    } catch (err) {
      console.error(err);
      setError('Error al obtener la entrada');
    } finally {
      setLoading(false);
    }
  }

  return { entry, loading, error, fetchEntry };
}
