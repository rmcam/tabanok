/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthUser, RegisterData } from './AuthContext';

import api from '../../lib/api';

export async function login(identifier: string, password: string): Promise<AuthUser> {
  try {
    const res = await api.post(`${import.meta.env.VITE_API_URL}/auth/signin`, { identifier, password });
    const data = res.data;
    const user = {
      id: data.user.id,
      username: data.user.username,
      email: data.user.email,
      roles: data.user.roles,
      token: data.accessToken,
    };
    sessionStorage.setItem('authUser', JSON.stringify(user));
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const message =
        (error as any).response?.data?.message || error.message || 'Error al iniciar sesión';
      throw new Error(message);
    }
    throw new Error('Error al iniciar sesión');
  }
}

export async function register(data: RegisterData): Promise<AuthUser> {
  try {
    const res = await api.post(`${import.meta.env.VITE_API_URL}/auth/signup`, data);
    return {
      id: res.data.user.id,
      username: res.data.user.username,
      email: res.data.user.email,
      roles: res.data.user.roles,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      const message =
        (error as any).response?.data?.message || error.message || 'Error al registrarse';
      throw new Error(message);
    }
    throw new Error('Error al registrarse');
  }
}

export function logout() {
  // Si usas JWT en localStorage/cookies, aquí puedes limpiar el almacenamiento
  sessionStorage.removeItem('authUser');
  // Si el backend requiere endpoint de logout, puedes hacer la petición aquí
}
