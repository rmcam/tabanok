"use client";

import React from "react";
import { useActiveMissions } from "../../hooks/gamification/useGamification";

interface Props {
  userId: string;
}

export default function GamificationMissions({ userId }: Props) {
  const { data: missions, loading, error } = useActiveMissions(userId);

  if (loading) return <div>Cargando misiones...</div>;
  if (error) return <div>{error}</div>;
  if (!missions.length) return <div>No tienes misiones activas.</div>;

  return (
    <div className="p-4 border rounded shadow mt-4">
      <h2 className="font-bold mb-2">Tus misiones</h2>
      <ul className="list-disc list-inside">
        {missions.map((mission) => (
          <li key={mission.id}>
            {mission.title} - {mission.completed ? "Completada ✅" : `${mission.progress}%`}
          </li>
        ))}
      </ul>
    </div>
  );
}
