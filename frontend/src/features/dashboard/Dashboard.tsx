import React from "react";
import { useUnits } from "./useUnits";
import { useAuth } from "../../features/auth/useAuth";
import ProgressPanel from '../../features/gamification/components/ProgressPanel';

const Dashboard: React.FC = () => {
  const { units, loading, error } = useUnits();
  const { user } = useAuth();

  if (loading) {
    return <div>Cargando unidades...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <main>
      <h1>Bienvenido, {user?.username || "usuario"}!</h1>
      <p style={{ color: "green" }}>Has iniciado sesión correctamente.</p>
      <h2>Mis Unidades</h2>
      <ProgressPanel />
      {units.length === 0 ? (
        <p>No tienes unidades asignadas.</p>
      ) : (
        <ul>
          {units.map((unit) => (
            <li key={unit.id}>
              <strong>{unit.name}</strong>
              {unit.description && <span> — {unit.description}</span>}
              {unit.progress !== undefined && (
                <span> | Progreso: {unit.progress}%</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Dashboard;
