import React from 'react';
import useUnits from '../hooks/useUnits';

const Dashboard: React.FC = () => {
  const { units, loading, error } = useUnits();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {units.map((unit) => (
        <div key={unit.id}>
          <h2>{unit.name}</h2>
          <p>{unit.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
