import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import { useAuth } from '../features/auth/useAuth';

export interface Unity {
  id: string;
  name: string;
  description: string;
  // Agrega aquí otros campos de la entidad Unity
}

function useUnits() {
  const [units, setUnits] = useState<Unity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function fetchUnits() {
      try {
        const response = await api.get<Unity[]>('/unity');
        setUnits(response.data);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    }

    if (isAuthenticated) {
      fetchUnits();
    }
  }, [isAuthenticated]);

  return { units, loading, error };
}

export default useUnits;
