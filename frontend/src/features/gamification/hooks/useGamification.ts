import { useState, useEffect } from 'react';

export const useGamification = () => {
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    // Aquí iría la lógica para obtener las estadísticas del usuario
    // Por ahora, simularemos una respuesta
    const fakeStats = {
      points: 100,
      level: 1,
    };
    setUserStats(fakeStats);
  }, []);

  return { userStats };
};
