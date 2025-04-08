"use client";

import React from "react";
import { useUserStats } from "../../hooks/gamification/useGamification";

interface Props {
  userId: string;
}

export default function GamificationUserStats({ userId }: Props) {
  const { data: stats, loading, error } = useUserStats(userId);

  if (loading) return <div>Cargando estadísticas...</div>;
  if (error) return <div>{error}</div>;
  if (!stats) return <div>No hay datos</div>;

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="font-bold mb-2">Tu progreso</h2>
      <p><strong>Puntos:</strong> {stats.points}</p>
      <p><strong>Nivel:</strong> {stats.level}</p>
      <h3 className="font-semibold mt-4">Logros</h3>
      <ul className="list-disc list-inside">
        {stats.achievements.map((ach) => (
          <li key={ach.id}>
            {ach.name} - {ach.completed ? "✅" : `${ach.progress}%`}
          </li>
        ))}
      </ul>
    </div>
  );
}
