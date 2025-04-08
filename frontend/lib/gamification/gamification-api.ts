export interface UserStats {
  userId: string;
  points: number;
  level: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  progress: number;
  completed: boolean;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  available: boolean;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  completed: boolean;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  points: number;
  rank: number;
}

const API_BASE = "/api/v1/gamification";

export async function getUserStats(userId: string): Promise<UserStats> {
  const res = await fetch(`${API_BASE}/user/${userId}/stats`);
  if (!res.ok) throw new Error("Error fetching user stats");
  return res.json();
}

export async function getUserAchievements(userId: string): Promise<Achievement[]> {
  const res = await fetch(`${API_BASE}/user/${userId}/achievements`);
  if (!res.ok) throw new Error("Error fetching achievements");
  return res.json();
}

export async function getUserRewards(userId: string): Promise<Reward[]> {
  const res = await fetch(`${API_BASE}/user/${userId}/rewards`);
  if (!res.ok) throw new Error("Error fetching rewards");
  return res.json();
}

export async function getActiveMissions(userId: string): Promise<Mission[]> {
  const res = await fetch(`${API_BASE}/user/${userId}/missions`);
  if (!res.ok) throw new Error("Error fetching missions");
  return res.json();
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const res = await fetch(`${API_BASE}/leaderboard`);
  if (!res.ok) throw new Error("Error al obtener la tabla de clasificación");
  return res.json();
}

/**
 * Otorga un logro a un usuario
 */
export async function grantAchievement(userId: string, achievementId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/achievement/${userId}/${achievementId}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Error al otorgar logro");
}

/**
 * Otorga una recompensa a un usuario
 */
export async function grantReward(userId: string, rewardId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/reward/${userId}/${rewardId}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Error al otorgar recompensa");
}

/**
 * Suma puntos a un usuario
 */
export async function addPoints(userId: string, points: number): Promise<number> {
  const res = await fetch(`${API_BASE}/points/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ points }),
  });
  if (!res.ok) throw new Error("Error al actualizar puntos");
  const data = await res.json();
  return data.points;
}

/**
 * Actualiza el nivel del usuario
 */
export async function updateLevel(userId: string): Promise<number> {
  const res = await fetch(`${API_BASE}/level/${userId}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Error al actualizar nivel");
  const data = await res.json();
  return data.level;
}
