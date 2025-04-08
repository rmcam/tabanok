/**
 * Tipos, utilidades y constantes compartidas para backend y frontend
 */

// Tipos globales
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'user';
}

// Constantes globales
export const ROLES = ['admin', 'user'] as const;

// Funciones utilitarias
export function isAdmin(user: User): boolean {
  return user.role === 'admin';
}
