import React from 'react';
import { useGamification } from '../hooks/useGamification';

const ProgressPanel: React.FC = () => {
  const { userStats } = useGamification();

  if (!userStats) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Progreso</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="font-medium">Puntos:</p>
          <p>{userStats.points}</p>
        </div>
        <div>
          <p className="font-medium">Nivel:</p>
          <p>{userStats.level}</p>
        </div>
        {/* Agregar más estadísticas según sea necesario */}
      </div>
    </div>
  );
};

export default ProgressPanel;
