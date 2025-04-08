"use client";

import React from "react";
import { useUserRewards } from "../../hooks/gamification/useGamification";

interface Props {
  userId: string;
}

export default function GamificationRewards({ userId }: Props) {
  const { data: rewards, loading, error } = useUserRewards(userId);

  if (loading) return <div>Cargando recompensas...</div>;
  if (error) return <div>{error}</div>;
  if (!rewards.length) return <div>No tienes recompensas aún.</div>;

  return (
    <div className="p-4 border rounded shadow mt-4">
      <h2 className="font-bold mb-2">Tus recompensas</h2>
      <ul className="list-disc list-inside">
        {rewards.map((reward) => (
          <li key={reward.id}>
            {reward.name} - {reward.available ? "Disponible 🎁" : "Canjeada ✅"}
          </li>
        ))}
      </ul>
    </div>
  );
}
