import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import { useAuth } from '../features/auth/useAuth';

export interface Mission {
  id: string;
  name: string;
  description: string;
  // Agrega aquí otros campos de la entidad Mission
}

function useMissions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function fetchMissions() {
      try {
        const response = await api.get<Mission[]>('/gamification/missions');
        setMissions(response.data);
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
      fetchMissions();
    }
  }, [isAuthenticated]);

  return { missions, loading, error };
}

export default useMissions;
