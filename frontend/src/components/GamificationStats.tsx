import React, { useEffect, useState } from 'react';

interface GamificationStatsProps {
  userId: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  points: number;
}

interface Reward {
  rewardId: string;
  status: string;
  metadata?: Record<string, unknown>;
  consumedAt?: string;
  expiresAt?: string;
  dateAwarded?: string;
  createdAt?: string;
}

interface GamificationStats {
  points: number;
  level: number;
  achievements: Achievement[];
  // Puedes agregar aquí otras propiedades de las estadísticas
}

const GamificationStats: React.FC<GamificationStatsProps> = ({ userId }) => {
  const [stats, setStats] = useState<GamificationStats | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/gamification/stats/${userId}`);
        if (!response.ok) {
          throw new Error(`Error fetching stats: ${response.status}`);
        }
        const data: GamificationStats = await response.json();
        setStats(data);
      } catch (error: unknown) {
        setError((error as Error).message);
      }
    };

    const fetchRewards = async () => {
      try {
        const response = await fetch(`/gamification/rewards/user/${userId}`);
        if (!response.ok) {
          throw new Error(`Error fetching rewards: ${response.status}`);
        }
        const data: Reward[] = await response.json();
        setRewards(data);
      } catch (error: unknown) {
        setError((error as Error).message);
      }
    };

    fetchStats();
    fetchRewards();
  }, [userId]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!stats) {
    return <p>Cargando estadísticas...</p>;
  }

  return (
    <div>
      <h2>Estadísticas de Gamificación</h2>
      <p>Puntos: {stats.points}</p>
      <p>Nivel: {stats.level}</p>
      <h3>Logros desbloqueados:</h3>
      <ul>
        {stats.achievements.map((achievement) => (
          <li key={achievement.id}>{achievement.name}</li>
        ))}
      </ul>
      <h3>Recompensas obtenidas:</h3>
      <ul>
        {rewards.length === 0 && <li>No hay recompensas aún.</li>}
        {rewards.map((reward) => (
          <li key={reward.rewardId}>
            ID: {reward.rewardId} | Estado: {reward.status}
            {reward.dateAwarded && (
              <> | Otorgada: {new Date(reward.dateAwarded).toLocaleDateString()}</>
            )}
            {reward.consumedAt && (
              <> | Consumida: {new Date(reward.consumedAt).toLocaleDateString()}</>
            )}
            {reward.expiresAt && <> | Expira: {new Date(reward.expiresAt).toLocaleDateString()}</>}
          </li>
        ))}
      </ul>
      {/* Próximamente: misiones activas, racha, ranking, badges */}
    </div>
  );
};
export default GamificationStats;
