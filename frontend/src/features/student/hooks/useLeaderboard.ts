import api from '@/lib/api';
import { useEffect, useState } from 'react';

interface LeaderboardEntry {
  userId: string;
  username: string;
  score: number;
  rank: number;
}

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchLeaderboard() {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<LeaderboardEntry[]>('/gamification/leaderboard');
      setLeaderboard(response.data);
    } catch (err) {
      console.error(err);
      setError('Error al obtener la tabla de clasificación');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return { leaderboard, loading, error, refetch: fetchLeaderboard };
}
