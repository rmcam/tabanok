import { jwtDecode } from 'jwt-decode';
import { User } from '../types/authTypes'; // Importar la interfaz User

// Las funciones de manejo de tokens ahora dependen del backend que establece cookies HttpOnly.
// El frontend ya no guarda ni lee directamente de localStorage.

export const saveToken = (): void => {
  // No-op: El backend maneja el guardado en cookies HttpOnly
};

export const getToken = (): string | null => {
  // No se puede leer cookies HttpOnly desde el frontend.
  // La autenticación ahora se basa en la respuesta del backend o en la presencia de la cookie en las solicitudes.
  // Para propósitos de lógica de frontend que necesite saber si un usuario está "autenticado"
  // sin leer el token directamente, se necesitará un endpoint de backend para validar la sesión.
  // Por ahora, devolvemos null ya que no podemos acceder al token.
  return null;
};

export const removeToken = (): void => {
  // No-op: El backend maneja la eliminación de cookies HttpOnly
};

export const saveRefreshToken = (): void => {
  // No-op: El backend maneja el guardado en cookies HttpOnly
};

export const getRefreshToken = (): string | null => {
  // No se puede leer cookies HttpOnly desde el frontend.
  return null;
};

export const removeRefreshToken = (): void => {
  // No-op: El backend maneja la eliminación de cookies HttpOnly
};

export const isAuthenticated = (): boolean => {
  // La lógica de autenticación ahora debe depender de una validación del lado del servidor
  // o de la respuesta de un endpoint de verificación de sesión.
  // Como no podemos leer el token, asumimos que si la aplicación llega a un estado
  // donde se necesita autenticación, el backend lo validará a través de la cookie.
  // Esta función puede necesitar ser refactorizada dependiendo de cómo se implemente la validación de sesión.
  // Por ahora, devolvemos false ya que no podemos confirmar la autenticación desde el frontend.
  console.warn("isAuthenticated en frontend no puede validar tokens en cookies HttpOnly directamente.");
  return false; // Asumimos no autenticado desde la perspectiva del frontend sin validación backend.
};

// Esta función asume que se le pasa un token (por ejemplo, recibido en la respuesta de login antes de que el backend lo ponga en cookie)
// o que se obtiene de alguna otra manera si el backend expone un endpoint para obtener info del usuario autenticado.
// Si el token solo está en cookies HttpOnly, esta función no será útil a menos que el backend la proporcione.
export const decodeTokenAndCreateUser = (token: string): User => {
  const decoded = jwtDecode<{ id: number; email: string; role: string }>(token);
  return {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
  };
};
