/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthUser, RegisterData } from './AuthContext';

import api from '../../lib/api';

export async function login(identifier: string, password: string): Promise<AuthUser> {
  try {
    const res = await api.post(`${import.meta.env.VITE_API_URL}/auth/signin`, {
      identifier,
      password,
    });
    const data = res.data;
    console.log('Respuesta del login:', data);
    const user: AuthUser = {
      id: data.user.id,
      username: data.user.username,
      email: data.user.email,
      roles: data.user.roles,
      token: data.accessToken,
    };
    return user;
  } catch (error: any) {
    let message = 'Error al iniciar sesión';
    if (error.response) {
      console.log('Error en la respuesta del login:', error.response);
      message = error.response.data.message || message;
    } else if (error.message) {
      message = error.message;
    }
    throw new Error(message);
  }
}

export async function register(data: RegisterData): Promise<AuthUser> {
  try {
    const res = await api.post(`${import.meta.env.VITE_API_URL}/auth/signup`, data);
    const dataRes = res.data.user;
    const user: AuthUser = {
      id: dataRes.id,
      username: dataRes.username,
      email: dataRes.email,
      roles: dataRes.roles,
    };
    return user;
  } catch (error: any) {
    let message = 'Error al registrarse';
    if (error.response) {
      message = error.response.data.message || message;
    } else if (error.message) {
      message = error.message;
    }
    throw new Error(message);
  }
}

export function logout() {
  // If using JWT in localStorage/cookies, you can clear the storage here
  sessionStorage.removeItem('authUser');
  // If the backend requires a logout endpoint, you can make the request here
}
