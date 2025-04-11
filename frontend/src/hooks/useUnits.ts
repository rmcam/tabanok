import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import api from '@/lib/api';

interface Unity {
  id: string;
  name: string;
  description: string;
  // Agrega aquí otros campos de la entidad Unity
}

function useUnits() {
  const [units, setUnits] = useState<Unity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUnits() {
      try {
        const response = await api.get<Unity[]>('/unity');
        setUnits(response.data);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred.');
        }
        setLoading(false);
      }
    }

    fetchUnits();
  }, []);

  return { units, loading, error };
}

export default useUnits;
