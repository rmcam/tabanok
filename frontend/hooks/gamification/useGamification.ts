import { useState, useEffect, useCallback } from "react";
import {
  getUserStats,
  getUserAchievements,
  getUserRewards,
  getActiveMissions,
  getLeaderboard,
  grantAchievement,
  grantReward,
  addPoints,
  updateLevel,
  UserStats,
  Achievement,
  Reward,
  Mission,
  LeaderboardEntry,
} from "../../lib/gamification/gamification-api";

/**
 * Hook para obtener estadísticas del usuario
 */
export function useUserStats(userId: string) {
  const [data, setData] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getUserStats(userId)
      .then(setData)
      .catch(() => setError("Error al obtener estadísticas"))
      .finally(() => setLoading(false));
  }, [userId]);

  return { data, loading, error };
}

/**
 * Hook para obtener logros del usuario
 */
export function useUserAchievements(userId: string) {
  const [data, setData] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getUserAchievements(userId)
      .then(setData)
      .catch(() => setError("Error al obtener logros"))
      .finally(() => setLoading(false));
  }, [userId]);

  return { data, loading, error };
}

/**
 * Hook para obtener recompensas del usuario
 */
export function useUserRewards(userId: string) {
  const [data, setData] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getUserRewards(userId)
      .then(setData)
      .catch(() => setError("Error al obtener recompensas"))
      .finally(() => setLoading(false));
  }, [userId]);

  return { data, loading, error };
}

/**
 * Hook para obtener misiones activas del usuario
 */
export function useActiveMissions(userId: string) {
  const [data, setData] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getActiveMissions(userId)
      .then(setData)
      .catch(() => setError("Error al obtener misiones"))
      .finally(() => setLoading(false));
  }, [userId]);

  return { data, loading, error };
}

/**
 * Hook para obtener el leaderboard
 */
export function useLeaderboard() {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getLeaderboard()
      .then(setData)
      .catch(() => setError("Error al obtener tabla de clasificación"))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

/**
 * Hook para otorgar un logro a un usuario
 */
export function useGrantAchievement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const grant = useCallback(async (userId: string, achievementId: string) => {
    setLoading(true);
    setError(null);
    try {
      await grantAchievement(userId, achievementId);
    } catch {
      setError("Error al otorgar logro");
    } finally {
      setLoading(false);
    }
  }, []);

  return { grant, loading, error };
}

/**
 * Hook para otorgar una recompensa a un usuario
 */
export function useGrantReward() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const grant = useCallback(async (userId: string, rewardId: string) => {
    setLoading(true);
    setError(null);
    try {
      await grantReward(userId, rewardId);
    } catch {
      setError("Error al otorgar recompensa");
    } finally {
      setLoading(false);
    }
  }, []);

  return { grant, loading, error };
}

/**
 * Hook para sumar puntos a un usuario
 */
export function useAddPoints() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const add = useCallback(async (userId: string, points: number) => {
    setLoading(true);
    setError(null);
    try {
      await addPoints(userId, points);
    } catch {
      setError("Error al actualizar puntos");
    } finally {
      setLoading(false);
    }
  }, []);

  return { add, loading, error };
}

/**
 * Hook para actualizar el nivel del usuario
 */
export function useUpdateLevel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      await updateLevel(userId);
    } catch {
      setError("Error al actualizar nivel");
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
}
