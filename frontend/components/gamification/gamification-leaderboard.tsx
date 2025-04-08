"use client";

import React from "react";
import { useLeaderboard } from "../../hooks/gamification/useGamification";

export default function GamificationLeaderboard() {
  const { data: entries, loading, error } = useLeaderboard();

  if (loading) return <div>Cargando ranking...</div>;
  if (error) return <div>{error}</div>;
  if (!entries.length) return <div>No hay datos de ranking.</div>;

  return (
    <div className="p-4 border rounded shadow mt-4">
      <h2 className="font-bold mb-2">Ranking</h2>
      <ol className="list-decimal list-inside">
        {entries.map((entry) => (
          <li key={entry.userId}>
            {entry.username} - {entry.points} pts (#{entry.rank})
          </li>
        ))}
      </ol>
    </div>
  );
}
