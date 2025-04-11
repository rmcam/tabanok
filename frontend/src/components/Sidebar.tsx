import React from 'react';
import useUnits from '../hooks/useUnits';

function Sidebar() {
  const { units, loading, error } = useUnits();

  if (loading) {
    return <div className="w-64 bg-gray-200 p-4">Cargando módulos...</div>;
  }

  if (error) {
    return <div className="w-64 bg-gray-200 p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-64 bg-gray-200 p-4">
      <h2>Módulos</h2>
      <ul>
        {units.map((unit) => (
          <li key={unit.id}>{unit.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
