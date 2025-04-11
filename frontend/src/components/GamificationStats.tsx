import React, { useState, useEffect } from 'react';

interface GamificationStatsProps {
  userId: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  points: number;
}

interface GamificationStats {
  points: number;
  level: number;
  achievements: Achievement[]; // Agrega la propiedad achievements
  // Agrega aquí otras propiedades de las estadísticas
}

const GamificationStats: React.FC<GamificationStatsProps> = ({ userId }) => {
  const [stats, setStats] = useState<GamificationStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/v1/gamification/stats/${userId}`);
        if (!response.ok) {
          throw new Error('Error fetching stats: ${response.status}');
        }
        const data: GamificationStats = await response.json();
        setStats(data);
      } catch (error: unknown) {
        setError((error as Error).message);
      }
    };

    fetchStats();
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
      {/* Muestra aquí otras propiedades de las estadísticas */}
    </div>
  );
};
export default GamificationStats;
