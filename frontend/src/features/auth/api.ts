import { AuthUser, RegisterData } from "./AuthContext";

// Cambia esta URL base según tu backend
const API_URL = "/api/auth";

export async function login(identifier: string, password: string): Promise<AuthUser> {
  const res = await fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Error al iniciar sesión");
  }
  const data = await res.json();
  // Ajusta el mapeo según la respuesta real del backend
  return {
    id: data.user.id,
    username: data.user.username,
    email: data.user.email,
    roles: data.user.roles,
  };
}

export async function register(data: RegisterData): Promise<AuthUser> {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const resp = await res.json();
    throw new Error(resp.message || "Error al registrarse");
  }
  const resp = await res.json();
  return {
    id: resp.user.id,
    username: resp.user.username,
    email: resp.user.email,
    roles: resp.user.roles,
  };
}

export function logout() {
  // Si usas JWT en localStorage/cookies, aquí puedes limpiar el almacenamiento
  localStorage.removeItem("authUser");
  // Si el backend requiere endpoint de logout, puedes hacer la petición aquí
}
