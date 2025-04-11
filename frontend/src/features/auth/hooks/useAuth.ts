import { useState } from 'react';
import api from '@/lib/api';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  languages: string[];
  preferences: {
    notifications: boolean;
    language: string;
    theme: string;
  };
  points: number;
  level: number;
  culturalPoints: number;
  gameStats: {
    totalPoints: number;
    level: number;
    lessonsCompleted: number;
    exercisesCompleted: number;
    perfectScores: number;
  };
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  lastLoginAt?: Date;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface LoginResponse {
  access_token: string;
  user: User;
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
    localStorage.setItem('user', JSON.stringify(response.data.user));
    setIsAuthenticated(true);
    return {
      accessToken: response.data.access_token,
      user: response.data.user,
    };
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  }

  return {
    isAuthenticated,
    login,
    logout,
    setIsAuthenticated,
  };
}
