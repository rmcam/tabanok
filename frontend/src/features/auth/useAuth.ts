import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  console.log("useAuth called");
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }
  return { ...ctx, token: ctx.user?.token }; // Include token in the returned context
}

/**
 * Hook para acceder al contexto de autenticación.
 *
 * @returns {{ user: User | null, signin: (data: SigninData) => Promise<void>, signup: (data: SignupData) => Promise<void>, logout: () => void, token: string | undefined }} - Objeto con el usuario, las funciones de inicio de sesión, registro y cierre de sesión, y el token de autenticación.
 * @throws {Error} - Si se usa fuera de un AuthProvider.
 */
