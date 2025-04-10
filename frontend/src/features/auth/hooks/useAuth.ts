import { useState } from 'react';
import api from '@/lib/api';

interface LoginResponse {
  access_token: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('token'));
  });

  async function login(email: string, password: string) {
    const response = await api.post<LoginResponse>('/auth/signin', {
      email,
      password,
    });
    localStorage.setItem('token', response.data.access_token);
    setIsAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }

  return {
    isAuthenticated,
    login,
    logout,
  };
}
