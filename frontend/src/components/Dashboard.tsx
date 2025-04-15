import React from 'react';
import Sidebar from './Sidebar'; // Importa el componente Sidebar
import { Unit } from '../features/dashboard/useUnits';

interface DashboardProps {
  units: Unit[];
  loading: boolean;
  error: string | null;
}

function Dashboard({ units, loading, error }: DashboardProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar /> {/* Agrega el componente Sidebar */}
      <div className="flex-1 p-4">
        <h1>Dashboard</h1>
        <p>Bienvenido al dashboard!</p>
        {/* Aquí irá el contenido principal del dashboard */}
        {loading && <div>Cargando unidades...</div>}
        {error && <div>Error: {error}</div>}
        <ul>
          {units.map((unit) => (
            <li key={unit.id}>{unit.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
