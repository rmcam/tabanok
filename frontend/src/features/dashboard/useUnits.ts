import { useEffect, useState } from 'react';
import api from '../../lib/api';

export interface Unit {
  id: string;
  name: string;
  description?: string;
  progress?: number;
  // Otros campos relevantes
}

export function useUnits(token?: string) {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    api
      .get<Unit[]>('/api/unity', {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      }) // Include headers in API call
      .then((res) => {
        if (isMounted) {
          setUnits(res.data);
          setError(null);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Error al cargar las unidades');
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [token]);

  return { units, loading, error };
}

/**
 * Hook para obtener las unidades del usuario autenticado.
 *
 * @param {string} token - Token de autenticación del usuario.
 * @returns {{ units: Unit[], loading: boolean, error: string | null }} - Objeto con las unidades, el estado de carga y el error (si existe).
 */
